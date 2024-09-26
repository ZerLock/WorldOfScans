import * as React from "react"
import {
  Box,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { APP_NAME, MANGAS } from "../utils/consts";

import { urlSpacesUnparser } from "../utils/utils";

export const App = () => {
    const navigate = useNavigate();

    const goToChapterSelection = (manga: string) => {
        navigate(`/manga/${manga}/chapter`);
    };

    return (
        <Box textAlign="center" fontSize="xl" h="100%">
            <VStack>
                <Heading>{APP_NAME}</Heading>
                {MANGAS.map((manga, index) => (
                    <Button key={index} w="100%" bgColor="transparent" onClick={() => goToChapterSelection(manga)}>
                        {urlSpacesUnparser(manga)}
                    </Button>
                ))}
            </VStack>
        </Box>
      );
};
