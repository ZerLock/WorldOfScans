import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, Image, VStack, Text, Box } from "@chakra-ui/react";
import { numberToArray, pageUrl } from "../utils/utils";
import { MAX_PAGES } from "../utils/consts";
import { PaginationSelector } from "../components/PaginationSelector";

export const Reader = () => {
    const navigate = useNavigate();
    const params = useParams();
    const manga = params.manga || '';
    const chapter = Number(params.chapter);

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
                {numberToArray(MAX_PAGES).map((page, index) => (
                    <Image key={index} maxW="100%" maxH="100%" src={pageUrl(manga, chapter, page)} fallback={<></>} />
                ))}
                <PaginationSelector prevDisabled={chapter <= 1} onPrev={goToPrevChapter} nextDisabled={false} onNext={goToNextChapter} />
            </VStack>
        </>
    );
};
