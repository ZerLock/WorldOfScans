import { Box, Text, Image as CImage, HStack, VStack, IconButton, Button, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { EngineContext } from '../libs/engine/EngineContext';
import { useEffect, useMemo, useState } from 'react';
import utils from '../utils/utils';
import { IoArrowBack, IoHeart, IoHeartOutline } from 'react-icons/io5';
import { TruncatedText } from '../components/TruncatedText';
import consts from '../utils/consts';
import { AppLayout } from '../components/AppLayout';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { getArray, saveArray } from '../utils/storage';
import LazyImage from '../components/LazyImage';

export const Manga = () => {
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

            const saved: string[] = getArray(consts.MANGA_SAVED_KEY);
            setSavedMangas(saved);
            setMangaSaved(saved.includes(manga));

            setNbChapters(await EngineContext.getNbChapters(manga));

            setLastChapter(utils.getLastChapter(manga));

            let history = getArray(consts.HISTORY_KEY);
            saveArray(consts.HISTORY_KEY, [manga, ...(history.filter((e) => e !== manga))]);

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
            setSavedMangas(savedMangas.filter((e) => e !== manga));
            saveArray(consts.MANGA_SAVED_KEY, savedMangas.filter((e) => e !== manga));
        } else {
            setSavedMangas([manga, ...savedMangas]);
            saveArray(consts.MANGA_SAVED_KEY, [manga, ...savedMangas])
        }
        setMangaSaved(old => !old);
    };

    const continueAtLastChapter = () => {
        navigate(`/manga/${manga}/chapter/${lastChapter}`);
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
                    <TruncatedText text={(consts.MANGAS as any)[manga]} title="Synopsis" nbOfLines={3} bgColor={`rgb(${lightBgColor})`} />

                    <VStack textAlign="start" w="100%" alignSelf="start" mt="16px" px="10px">
                        <Button onClick={continueAtLastChapter} bgColor={`rgb(${lightBgColor})`} _hover={{ backgroundColor: `rgb(${lightBgColor})` }} color="white" w="100%">{lastChapter === 1 ? 'Commencer le manga' : `Continuer le chapitre ${lastChapter}`}</Button>
                        <HStack px="5px" py="10px" w="100%" justify="space-between" align="center">
                            <Text fontSize="14px" fontWeight={900}>{nbChapters} chapitres</Text>
                            <HStack onClick={reverseChaptersOrder} _hover={{cursor: 'pointer'}} align="center" gap={1}>
                                <HiOutlineArrowsUpDown />
                                <Text>{reverseOrder ? 'first' : 'last '}</Text>
                            </HStack>
                        </HStack>
                        {chaptersArray.length === 0 ? <>
                            <Spinner mt="10px" size="lg" />
                        </> : <>
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
                                        <Text fontSize="12px" fontWeight="bold">Chapitre {chapter}</Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </>}
                    </VStack>
                </VStack>
            </AppLayout>
        </Box>
    );
}
