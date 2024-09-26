import * as React from 'react';
import { VStack } from "@chakra-ui/react";
import { ListItem } from '../components/ListItem';
import { numberToArray } from "../utils/utils";
import { DownloadIcon } from '@chakra-ui/icons';

interface ChapterSelectorProps {
    nbChapters: number;
    onChange: (chapter: number) => void;
    children?: JSX.Element;
}

export const ChapterSelector = ({ nbChapters, onChange, children }: ChapterSelectorProps) => {
    const downloadChapter = (chapter: number) => {
        console.log('Download available soon...');
    };

    return (
        <>
            <VStack w="100%">
                {children}
                <VStack w="100%" overflowY="scroll">
                    {numberToArray(nbChapters).map((chapter, index) => (
                        <ListItem
                            key={index}
                            content={`Chapitre ${chapter}`}
                            principal={() => onChange(chapter)}
                            icon={<DownloadIcon />}
                            secondary={() => downloadChapter(chapter)}
                        />
                    ))}
                </VStack>
            </VStack>
        </>
    );
};
