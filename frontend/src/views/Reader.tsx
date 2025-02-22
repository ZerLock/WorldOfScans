import { Box, HStack, IconButton, Text, VStack, Image as CImage } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EngineContext } from "../libs/engine/EngineContext";
import utils from "../utils/utils";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { LazyLoader } from "../components/PagesLazyLoader";
import { useTranslation } from "react-i18next";

export const Reader = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const [nbChapters, setNbChapters] = useState<number>(0);
    const [nbPages, setNbPages] = useState<number>(0);
    const [nbImagesLoaded, setImagesLoaded] = useState(0);
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    useEffect(() => {
        const bootstrap = async () => {
            const tmpNbChapters = await EngineContext.getNbChapters(manga);
            setNbChapters(tmpNbChapters);

            const nbPages = await EngineContext.getNbPagesInChapter(manga, chapter);
            setNbPages(nbPages);
        };

        localStorage.setItem(utils.keys.chapterKeeperKey(manga), chapter.toString());
        bootstrap();
    }, [manga, chapter, nbChapters, navigate]);

    const isNextChapterExists = useMemo(() => chapter + 1 <= nbChapters, [chapter, nbChapters]);

    const backToManga = () => {
        navigate(`/manga/${manga}/chapter`);
    };

    const nextChapter = () => {
        setNbPages(0);
        setImagesLoaded(0);
        navigate(`/manga/${manga}/chapter/${chapter + 1}`);
    };

    return (
        <>
            <VStack color="black">
                <HStack px={{ base: '10px', md: '30%' }} pt="5px" w="100%" gap="1px" alignItems="center">
                    <IconButton zIndex={3} aria-label="back to manga button" colorScheme='transparent' icon={<IoArrowBack size="24px" color="black" />} onClick={backToManga}/>
                    <Text>{t('chapter')} {utils.chapters.chapterNumber(manga, chapter)}</Text>
                </HStack>
                <VStack mx={{ base: '0px', md: '25%' }} mb="50px">
                    <LazyLoader key={`${manga}/${chapter}`} manga={manga} chapter={chapter} nbPages={nbPages} loadFinished={() => setImagesLoaded(nbPages)} />
                    {nbImagesLoaded >= nbPages && isNextChapterExists && <>
                        <Box w="100%" px="10px" mt="20px">
                            <HStack borderWidth={1} borderColor="rgb(242, 242, 242)" p={2} pr={4} borderRadius={8} w="100%" justify="space-between" onClick={nextChapter} _hover={{ cursor: 'pointer' }}>
                                <HStack w="100%" gap={2}>
                                    <Box display="inline-block" overflow="hidden" borderRadius={8}>
                                        <CImage loading="lazy" h="90px" objectFit="cover" transform="scale(2)" aspectRatio={4/3} src={EngineContext.getPageUrl(manga, chapter + 1, 1)} />
                                    </Box>
                                    <Text fontSize="14px" fontWeight={900}>{t('chapter')} {utils.chapters.chapterNumber(manga, chapter + 1)}</Text>
                                </HStack>
                                <IoArrowForward size="24px" color="black" />
                            </HStack>
                        </Box>
                    </>}
                </VStack>
            </VStack>
        </>
    );
}
