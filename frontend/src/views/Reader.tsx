import * as React from "react";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VStack, Text, Box, HStack, IconButton } from "@chakra-ui/react";
import { chapterKeeperKey, pageUrl } from "../utils/utils";
import { PaginationSelector } from "../components/PaginationSelector";
import { fetchMangaData } from "../utils/api";
import { setValue } from "../utils/storage";
import { CloseIcon } from "@chakra-ui/icons";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

    useEffect(() => {
        const bootstrap = async () => {
            const pagesContainer = document.getElementById('pages-container');
            if (!pagesContainer) {
                navigate(`/manga/${manga}/chapter`);
                return;
            }

            const res = await fetchMangaData(manga);

            pagesContainer.innerHTML = '';
            res[chapter].forEach((_, index) => {
                const img = new Image();
                img.src = pageUrl(manga, chapter, index + 1);
                img.loading = 'lazy';

                pagesContainer.appendChild(img);
            });
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
                    <HStack w="100%" px="10px" py="10px" borderBottom="1px" borderColor="gray.400">
                        <IconButton colorScheme="teal" aria-label="go back" icon={<CloseIcon />} onClick={goToChapterSelection} />
                        <Text fontSize="18px" fontWeight="bold">{manga}</Text>
                    </HStack>
                    <Box marginTop="16px" w="100%" px="30px">
                        <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter}>
                            <Text fontSize="18px">Chapitre {chapter}</Text>
                        </PaginationSelector>
                    </Box>
                </VStack>
                <VStack w="100%" h="100%" id="pages-container" gap="24px"></VStack>
                <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter} />
            </VStack>
        </>
    );
};
