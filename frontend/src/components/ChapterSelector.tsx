import * as React from 'react';
import { Select } from "@chakra-ui/react";
import { numberToArray } from "../utils/utils";

interface ChapterSelectorProps {
    nbChapters: number;
    onChange: (chapter: number) => void;
    children?: JSX.Element;
}

export const ChapterSelector = ({ nbChapters, onChange, children }: ChapterSelectorProps) => {
    const goToChapter = (e: any) => {
        onChange(e.target.value);
    };

    return (
        <>
            {children}
            <Select placeholder="Choisir un chapitre" onChange={goToChapter}>
                {numberToArray(nbChapters).map((chapter, index) => (
                    <option key={index} value={chapter}>Chapitre {chapter}</option>
                ))}
            </Select>
        </>
    );
};
