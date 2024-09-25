import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Heading, VStack, Text, Box } from "@chakra-ui/react";
import { pageUrl } from "../utils/utils";
import { PaginationSelector } from "../components/PaginationSelector";
import { fetchMangaData } from "../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const manga = params.manga || '';
    const chapter = Number(params.chapter);
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        const bootstrap = async () => {
            const res = await fetchMangaData(manga);
            setPages(res[chapter]);
        };

        bootstrap();
    }, []);

    const goToPrevChapter = () => {
        navigate(`/manga/${manga}/chapter/${chapter - 1}`);
    };

    const goToNextChapter = () => {
        navigate(`/manga/${manga}/chapter/${chapter + 1}`);
    };

    return (
        <>
            <VStack justifyItems="center" gap="32px" marginBottom="32px">
                <VStack gap="0px">
                    <Heading>{manga}</Heading>
                    <Text fontSize="24px">Chapitre {chapter}</Text>
                    <Box marginTop="16px">
                        <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter} />
                    </Box>
                </VStack>
                {pages.map((_, index) => (
                    <LazyLoadImage
                        key={index}
                        alt={`Page ${index}`}
                        height="100%"
                        width="100%"
                        src={pageUrl(manga, chapter, index + 1)}
                    />
                    //<Image key={index} maxW="100%" maxH="100%" src={pageUrl(manga, chapter, index + 1)} fallback={<></>} />
                ))}
                <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter} />
            </VStack>
        </>
    );
};