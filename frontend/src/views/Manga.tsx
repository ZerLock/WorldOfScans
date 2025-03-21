import { Box, Text, Image as CImage, HStack, VStack, IconButton, Button, SimpleGrid, Spinner, List, Divider } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { EngineContext } from '../libs/engine/EngineContext';
import { useEffect, useMemo, useState } from 'react';
import utils from '../utils/utils';
import { IoArrowBack, IoArrowUpOutline, IoGridOutline, IoHeart, IoHeartOutline, IoList } from 'react-icons/io5';
import { TruncatedText } from '../components/TruncatedText';
import consts from '../utils/consts';
import { AppLayout } from '../components/AppLayout';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import LazyImage from '../components/LazyImage';
import { useTranslation } from 'react-i18next';
import { getChaptersDisplay, getInterfaceLanguage, getSettings, saveSettings } from '../utils/settings';
import { Data } from '../utils/data';

export const Manga = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const manga = params.manga || '';
    const [bgColor, setBgColor] = useState('255, 255, 255');
    const [lightBgColor, setLightBgColor] = useState('200, 200, 200');
    const [mangaSaved, setMangaSaved] = useState<boolean>(false);
    const [savedMangas, setSavedMangas] = useState<string[]>([]);
    const [topbarOpacity, setTopbarOpacity] = useState(0);
    const [lastChapter, setLastChapter] = useState(1);
    const [nbChapters, setNbChapters] = useState(0);
    const [reverseOrder, setReverseOrder] = useState(false);
    const [display, setDisplay] = useState('list');

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const newOpacity = Math.min(scrollPosition / 300, 1);
        setTopbarOpacity(newOpacity);
      };

    useEffect(() => {
        const bootstrap = async () => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = EngineContext.getCoverUrl(manga);

            img.onload = () => {
                const [r, g, b] = utils.cover.getMainColor(img);
                const tmp = `${r}, ${g}, ${b}`;
                setBgColor(tmp);
                setLightBgColor(utils.cover.getLighterColor(tmp));
            }

            const saved = Data.instance.getSaved();
            setSavedMangas(saved);
            setMangaSaved(saved.includes(manga));

            setDisplay(getChaptersDisplay());

            setLastChapter(Data.instance.getRead(manga));

            setNbChapters(await EngineContext.getNbChapters(manga));

            window.addEventListener('scroll', handleScroll);
        };

        bootstrap();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [manga]);

    const reverseChaptersOrder = () => {
        setReverseOrder(old => !old);
    };

    const backToHome = () => {
        navigate('/');
    };

    const goToChapter = (chapter: number) => {
        navigate(`/manga/${manga}/chapter/${chapter}`);
    };

    const saveManga = () => {
        if (mangaSaved) {
            Data.instance.removeMangaSaved(manga).then(() => {}).catch(() => {});
        } else {
            Data.instance.addMangaSaved(manga).then(() => {}).catch(() => {});
        }
        setSavedMangas(Data.instance.getSaved());
        setMangaSaved(old => !old);
    };

    const continueAtLastChapter = () => {
        navigate(`/manga/${manga}/chapter/${lastChapter}`);
    };

    const changeDisplay = () => {
        const settings = getSettings();
        saveSettings({ ...settings, chaptersDisplay: display === 'list' ? 'grid' : 'list' });
        setDisplay(old => old === 'list' ? 'grid' : 'list');
    };

    const chaptersArray = useMemo(() => {
        const arr = utils.numberToArray(nbChapters);
        return reverseOrder ? arr : arr.reverse();
    }, [nbChapters, reverseOrder]);

    return (
        <Box position="relative" height="100%" minH="100vh" bg={`rgb(${bgColor})`} color="white">
            <Box position="fixed" top="0" left="0" h="50px" w="100%" opacity={topbarOpacity} backgroundColor={`rgb(${bgColor})`} zIndex={99}></Box>
            <HStack position="fixed" top="0" zIndex={100} px={{ base: '10px', md: '30%' }} py="5px" w="100%" justify="space-between">
                <IconButton zIndex={3} aria-label="back to home button" colorScheme='transparent' icon={<IoArrowBack size="24px" />} onClick={backToHome}/>
                <IconButton zIndex={3} aria-label="save manga" colorScheme="transparent" icon={mangaSaved ? <IoHeart size="24px" /> : <IoHeartOutline size="24px" />} onClick={saveManga} />
            </HStack>
            <Box position="relative" width="100%" h={{ base: '350px', md: '450px' }}>
                <CImage
                    src={EngineContext.getCoverUrl(manga)}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    position="absolute"
                    filter="blur(2px)"
                />
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="101%"
                    bgGradient={`linear-gradient(to bottom, rgba(${bgColor}, 0) 50%, rgba(${bgColor}, 0.5) 60%, rgba(${bgColor}, 0.7) 70%, rgba(${bgColor}, 0.9) 75%, rgba(${bgColor}))`}
                />

                <VStack position="absolute" bottom="20px" width="100%" textAlign="center" spacing={1}>
                    <CImage src={EngineContext.getCoverUrl(manga)} boxShadow="1 1 1 black" w={{ base: '70%', md: '30%'}} objectFit="cover" borderRadius={8} />
                    <Text fontSize="24px" fontWeight="bold">{manga}</Text>
                </VStack>
            </Box>

            <AppLayout>
                <VStack mt={2} w="100%" pb="30px">
                    <TruncatedText text={(consts.MANGAS as any)[manga][getInterfaceLanguage()] || 'Soon...'} title="Synopsis" nbOfLines={3} bgColor={`rgb(${lightBgColor})`} />

                    <VStack textAlign="start" w="100%" alignSelf="start" mt="16px" px="10px">
                        <Button onClick={continueAtLastChapter} bgColor={`rgb(${lightBgColor})`} _hover={{ backgroundColor: `rgb(${lightBgColor})` }} color="white" w="100%">{lastChapter === 1 ? t('start_manga') : `${t('continue_manga')} ${utils.chapters.chapterNumber(manga, lastChapter)}`}</Button>
                        <HStack px="5px" py="10px" w="100%" justify="space-between" align="center">
                            <Text fontSize="14px" fontWeight={900}>{nbChapters} {t('chapters').toLowerCase()}</Text>
                            <HStack align="center" gap={4}>
                                <HStack onClick={changeDisplay} _hover={{cursor: 'pointer'}} align="center" gap={1}>
                                    {display === 'grid' ? <IoGridOutline /> : <IoList />}
                                    <Text>{display}</Text>
                                </HStack>
                                <HStack onClick={reverseChaptersOrder} _hover={{cursor: 'pointer'}} align="center" gap={1}>
                                    <HiOutlineArrowsUpDown />
                                    <Text>{reverseOrder ? t('first') : t('last')}</Text>
                                </HStack>
                            </HStack>
                        </HStack>
                        {chaptersArray.length === 0 ? <>
                            <Spinner mt="10px" size="lg" />
                        </> : <>
                            {display === 'grid' ? <>
                                <SimpleGrid mx="10%" w="100%" columns={{ base: 3, md: 4 }} gap={2}>
                                    {chaptersArray.map((chapter) => (
                                        <Box key={chapter} _hover={{ cursor: 'pointer' }} onClick={() => goToChapter(chapter)}>
                                            <Box display="inline-block" overflow="hidden" borderRadius={8}>
                                                <LazyImage
                                                    src={EngineContext.getPageUrl(manga, chapter, 1)}
                                                    style={{
                                                        objectFit: 'cover',
                                                        aspectRatio: 4 / 3,
                                                    }}
                                                />
                                            </Box>
                                            <Text fontSize="12px" fontWeight="bold">{t('chapter')} {utils.chapters.chapterNumber(manga, chapter)}</Text>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </> : <>
                                <VStack mx="10px" w="100%" gap={0}>
                                    {chaptersArray.map((chapter, index) => (
                                        <Box key={chapter} w="100%">
                                            <HStack key={chapter} w="100%" borderWidth={0} borderRadius={0} py={2} px={1} display="flex" onClick={() => goToChapter(chapter)} _hover={{ cursor: 'pointer', backgroundColor: `rgb(${lightBgColor})` }}>
                                                <Text flex={1} fontWeight={900} fontSize="32">{utils.chapters.padNumber(chapter, chaptersArray[chaptersArray.length - 1]).toUpperCase()}</Text>
                                                <VStack flex={5} w="100%" px={2} gap={0}>
                                                    <Text w="100%" textAlign="left">{t('chapter')} {utils.chapters.chapterNumber(manga, chapter)}</Text>
                                                    <Text w="100%" fontStyle="italic" textAlign="left" mt={-1} opacity="50%">{EngineContext.getNbPagesInChapterSync(manga, chapter) || '...'} {t('pages')}</Text>
                                                </VStack>
                                            </HStack>
                                            {(chaptersArray.length !== index + 1) && <Divider color="white" w="100%" />}
                                        </Box>
                                    ))}
                                </VStack>
                            </>}
                            <HStack textDecoration="underline" _hover={{cursor: 'pointer'}} align="center" gap={1} onClick={() => window.scrollTo({ top: 0 })}>
                                <Text>{t('scroll_top')}</Text>
                                <IoArrowUpOutline />
                            </HStack>
                        </>}
                    </VStack>
                </VStack>
            </AppLayout>
        </Box>
    );
}
