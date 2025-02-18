import { SimpleGrid, Text } from "@chakra-ui/react";
import { ScanMiniCover } from "./ScanMiniCover";
import { EngineContext } from "../libs/engine/EngineContext";

interface ScansGridProps {
    items: string[];
    action: (value: string) => void;
    fallbackText: string;
}

export const ScansGrid = ({ items, action, fallbackText }: ScansGridProps) => (
    <>
        {items.length > 0 ?
            <SimpleGrid columns={{ base: 3, md: 4 }} gap={2}>
                {items.map((item) => (
                    <ScanMiniCover
                        key={item}
                        name={item}
                        imageUrl={EngineContext.getCoverUrl(item)}
                        action={() => action(item)}
                    />
                ))}
            </SimpleGrid>
        : <Text mt="50px" fontSize="14px" textAlign="center">{fallbackText}</Text>}
    </>
);
