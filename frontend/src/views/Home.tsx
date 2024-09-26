import * as React from "react"
import {
  Box,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { APP_NAME, MANGAS } from "../utils/consts";

import { urlSpacesUnparser } from "../utils/utils";
import { ListItem } from "../components/ListItem";

export const App = () => {
    const navigate = useNavigate();

    const goToChapterSelection = (manga: string) => {
        navigate(`/manga/${manga}/chapter`);
    };

    return (
        <Box textAlign="center" fontSize="xl" h="100%">
            <VStack w="100%" px="30px">
                <Heading mt="50px">{APP_NAME}</Heading>
                <Box w="100%" overflowY="scroll">
                    {MANGAS.map((manga, index) => (
                        <ListItem
                            key={index}
                            content={urlSpacesUnparser(manga)}
                            principal={() => goToChapterSelection(manga)}
                        />
                    ))}
                </Box>
            </VStack>
        </Box>
      );
};
