import * as React from "react";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VStack, Text, Box } from "@chakra-ui/react";
import { chapterKeeperKey, mangaFinished, numberToArray, pageUrl } from "../utils/utils";
import { PaginationSelector } from "../components/PaginationSelector";
import { fetchMangaData } from "../utils/api";
import { setValue } from "../utils/storage";
import { Topbar } from "../components/Topbar";
import { AppLayout } from "../components/AppLayout";
import { ReaderLayout } from "../components/ReaderLayout";
import { Chapters as TChapters } from "../types/Chapters";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [nbPages, setNbPages] = useState<number>(0);
    const [chapters, setChapters] = useState<TChapters>({});
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    useEffect(() => {
        const bootstrap = async () => {
            window.scrollTo(0, 0);

            const res = await fetchMangaData(manga);
            setNbPages(res[chapter].length);
            setChapters(res);

            if (!res[chapter + 1]) {
                localStorage.setItem(mangaFinished(manga), 'true');
            }
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
                <AppLayout>
                    <VStack gap="0px" w="100%">
                        <Topbar close={goToChapterSelection} content={manga} />
                        <Box marginTop="16px" w="100%" px="30px">
                            <PaginationSelector
                                prevDisabled={chapter <= 1}
                                onPrev={goToPrevChapter}
                                nextDisabled={!chapters[chapter + 1]}
                                onNext={goToNextChapter}>
                                <Text fontSize="18px">Chapitre {chapter}</Text>
                            </PaginationSelector>
                        </Box>
                    </VStack>
                </AppLayout>
                <ReaderLayout>
                    <VStack w="100%" h="100%" gap="0px" id="pages-container">
                        {numberToArray(nbPages).map((_, index) => (
                            <img
                                src={pageUrl(manga, chapter, index + 1)}
                                alt={`Page ${index + 1} chapitre ${chapter}`}
                                loading="lazy"
                                width="100%"
                                height="100%"
                            />
                        ))}
                    </VStack>
                </ReaderLayout>
                <PaginationSelector
                    prevDisabled={chapter <= 1}
                    onPrev={goToPrevChapter}
                    nextDisabled={!chapters[chapter + 1]}
                    onNext={goToNextChapter}
                />
            </VStack>
        </>
    );
};