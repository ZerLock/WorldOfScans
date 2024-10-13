import * as React from "react";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VStack, Text, Box } from "@chakra-ui/react";
import { chapterKeeperKey, numberToArray, pageUrl } from "../utils/utils";
import { PaginationSelector } from "../components/PaginationSelector";
import { fetchMangaData } from "../utils/api";
import { setValue } from "../utils/storage";
import { Topbar } from "../components/Topbar";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [nbPages, setNbPages] = React.useState<number>(0);
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    useEffect(() => {
        const bootstrap = async () => {
            const pagesContainer = document.getElementById('pages-container');
            if (pagesContainer) {
                pagesContainer.innerHTML = '';
            }
            window.scrollTo(0, 0);

            const res = await fetchMangaData(manga);
            setNbPages(res[chapter].length);
        };

        setValue(chapterKeeperKey(manga), chapter);
        bootstrap();
    }, [manga, chapter, navigate]);

    const goToPrevChapter = () => {
        navigate(`/manga/${manga}/chapter/${chapter - 1}`);
    };

    const goToNextChapter = () => {
        navigate(`/manga/${manga}/chapter/${chapter + 1}`);
    };

    const goToChapterSelection = () => {
        navigate(`/manga/${manga}/chapter`);
    };

    return (
        <>
            <VStack justifyItems="center" gap="32px" marginBottom="0px">
                <VStack gap="0px" w="100%">
                    <Topbar close={goToChapterSelection} content={manga} />
                    <Box marginTop="16px" w="100%" px="30px">
                        <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter}>
                            <Text fontSize="18px">Chapitre {chapter}</Text>
                        </PaginationSelector>
                    </Box>
                </VStack>
                <VStack w="100%" h="100%" gap="0px" id="pages-container">
                    {numberToArray(nbPages).map((_, index) => (
                        <LazyLoadImage
                            key={index}
                            height="100%"
                            width="100%"
                            src={pageUrl(manga, chapter, index + 1)}
                        />
                    ))}
                </VStack>
                <PaginationSelector
                    prevDisabled={chapter <= 1}
                    onPrev={goToPrevChapter}
                    nextDisabled={false}
                    onNext={goToNextChapter}
                />
            </VStack>
        </>
    );
};
