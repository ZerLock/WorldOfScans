import * as React from "react";
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VStack, Text, Box } from "@chakra-ui/react";
import utils from "../utils/utils";
import { PaginationSelector } from "../components/PaginationSelector";
import { setValue } from "../utils/storage";
import { Topbar } from "../components/Topbar";
import { AppLayout } from "../components/AppLayout";
import { ReaderLayout } from "../components/ReaderLayout";
import { EngineContext } from "../libs/engine/EngineContext";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [nbChapters, setNbChapters] = useState<number>(0);
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    const isNextChapterExists = useMemo(() => chapter + 1 <= nbChapters, [chapter, nbChapters]);

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
                    img.src = EngineContext.getPageUrl(manga, chapter, currentIndex + 1);
                    img.loading = 'lazy';
                    img.style.pointerEvents = 'none';
                    img.style.userSelect = 'none';

                    // eslint-disable-next-line
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

            const tmpNbChapters = await EngineContext.getNbChapters(manga);
            setNbChapters(tmpNbChapters);

            const nbPages = await EngineContext.getNbPagesInChapter(manga, chapter);

            if (!isNextChapterExists) {
                localStorage.setItem(utils.keys.mangaFinishedKey(manga), 'true');
            }

            loadImagesInBatch(pagesContainer, nbPages, 5);
        };

        setValue(utils.keys.chapterKeeperKey(manga), chapter);
        bootstrap();
    }, [manga, chapter, isNextChapterExists, navigate]);

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
                                nextDisabled={!isNextChapterExists}
                                onNext={goToNextChapter}>
                                <Text fontSize="18px">Chapitre {chapter}</Text>
                            </PaginationSelector>
                        </Box>
                    </VStack>
                </AppLayout>
                <ReaderLayout>
                    <VStack w="100%" h="100%" gap="0px" id="pages-container">
                        <Text>Coucou</Text>
                    </VStack>
                </ReaderLayout>
                <PaginationSelector
                    prevDisabled={chapter <= 1}
                    onPrev={goToPrevChapter}
                    nextDisabled={!isNextChapterExists}
                    onNext={goToNextChapter}
                />
            </VStack>
        </>
    );
};
