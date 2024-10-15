import * as React from "react";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VStack, Text, Box } from "@chakra-ui/react";
import { chapterKeeperKey, mangaFinished, pageUrl } from "../utils/utils";
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
    const [chapters, setChapters] = useState<TChapters>({});
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    useEffect(() => {
        const loadImagesInBatch = (container: Element, nbImages: number, size: number) => {
            if (container.innerHTML !== '') {
                return;
            }

            let currentIndex = 0;

            function loadNextBatch() {
                let imagesLoaded = 0;

                for (let i = 0; i < size && currentIndex < nbImages; i++) {
                    const img = new Image();
                    img.src = pageUrl(manga, chapter, currentIndex + 1);
                    img.loading = 'lazy';
                    img.style.pointerEvents = 'none';
                    img.style.userSelect = 'none';

                    img.onload = () => {
                        imagesLoaded++;
                        if (imagesLoaded === size) {
                            loadNextBatch();
                        }
                    };

                    console.log('loading page:', currentIndex + 1);
                    container.appendChild(img);
                    currentIndex++;
                }
            }

            loadNextBatch();
        };

        const bootstrap = async () => {
            window.scrollTo(0, 0);
            const pagesContainer = document.getElementById('pages-container');
            if (!pagesContainer) {
                navigate(`/manga/${manga}/chapter`);
                return;
            }

            pagesContainer.innerHTML = '';

            const res = await fetchMangaData(manga);
            setChapters(res);

            if (!res[chapter + 1]) {
                localStorage.setItem(mangaFinished(manga), 'true');
            }

            loadImagesInBatch(pagesContainer, res[chapter].length, 5);
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
                    <VStack w="100%" h="100%" gap="0px" id="pages-container"></VStack>
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
