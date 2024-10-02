import * as React from "react";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VStack, Text, Box } from "@chakra-ui/react";
import { chapterKeeperKey, pageUrl } from "../utils/utils";
import { PaginationSelector } from "../components/PaginationSelector";
import { fetchMangaData } from "../utils/api";
import { setValue } from "../utils/storage";
import { Topbar } from "../components/Topbar";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    useEffect(() => {
        const loadImagesInBatch = (container: Element, nbImages: number, size: number) => {
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

                    container.appendChild(img);
                    currentIndex++;
                }
            }

            loadNextBatch();
        };

        const bootstrap = async () => {
            const pagesContainer = document.getElementById('pages-container');
            if (!pagesContainer) {
                navigate(`/manga/${manga}/chapter`);
                return;
            }

            const res = await fetchMangaData(manga);

            pagesContainer.innerHTML = '';
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
                <VStack gap="0px" w="100%">
                    <Topbar close={goToChapterSelection} content={manga} />
                    <Box marginTop="16px" w="100%" px="30px">
                        <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter}>
                            <Text fontSize="18px">Chapitre {chapter}</Text>
                        </PaginationSelector>
                    </Box>
                </VStack>
                <VStack w="100%" h="100%" id="pages-container" gap="0px"></VStack>
                <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter} />
            </VStack>
        </>
    );
};
