import { Select } from "@chakra-ui/react";
import { numberToArray } from "../utils/utils";

interface ChapterSelectorProps {
    nbChapters: number;
    onChange: (chapter: number) => void;
}

export const ChapterSelector = ({ nbChapters, onChange }: ChapterSelectorProps) => {
    const goToChapter = (e: any) => {
        onChange(e.target.value);
    };

    return (
        <>
            <Select placeholder="Choisir un chapitre" onChange={goToChapter}>
                {numberToArray(nbChapters).map((chapter, index) => (
                    <option key={index} value={chapter}>Chapitre {chapter}</option>
                ))}
            </Select>
        </>
    );
};
