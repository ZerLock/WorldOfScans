import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import { Text, VStack, Spinner, Button, Image, Select, RadioGroup, HStack, Radio } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMangaData } from "../utils/api";
import { Chapters as TChapters } from "../types/Chapters";
import { getValue } from "../utils/storage";
import { chapterKeeperKey, coverUrl, numberToArray, urlSpacesUnparser } from "../utils/utils";
import { Topbar } from "../components/Topbar";
import { AppLayout } from '../components/AppLayout';
import { LANG, MANGAS } from '../utils/consts';
import { TextEllipsis } from '../components/TextEllipsis';

export const Chapters = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [chapters, setChapters] = useState<TChapters>({});
    const [selectedChapter, setSelectedChapter] = useState<number | undefined>(undefined);
    const [selectedLang, setSelectedLang] = useState<string>('fr');
    const manga = params.manga || '';

    useEffect(() => {
        const bootstrap = async () => {
            const res = await fetchMangaData(manga);
            setChapters(res);
        };

        const getLastChapter = () => {
            const chapter = getValue<number>(chapterKeeperKey(manga));
            if (chapter) {
                setSelectedChapter(chapter);
            }
        };

        bootstrap();
        getLastChapter();
    }, [manga]);

    const goToChapter = () => {
        if (selectedChapter) {
            navigate(`/manga/${manga}/chapter/${selectedChapter}?lang=${selectedLang}`);
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    const isLangDisabled = (lang: string): boolean => {
        return lang !== 'fr';
    };

    const nbChaters = useMemo(() => Object.keys(chapters).length, [chapters]);

    return (
        <AppLayout>
            <VStack justifyContent="center">
                <Topbar close={goToHome} content={manga} />
                <Image src={coverUrl(manga)} maxH="250px" px="10px" borderRadius="16px" />
                <TextEllipsis text={(MANGAS as { [key: string]: string })[urlSpacesUnparser(manga)]} />
                <Text
                    w="100%"
                    px="10px"
                    py="10px"
                    borderBottom="1px"
                    borderColor="gray.400"
                    fontSize="18px"
                    fontWeight="bold"
                >
                    Chapitres
                </Text>
                {nbChaters === 0 ? <>
                    <Spinner mt="32px" />
                    <Text>Chargement des chapitres...</Text>
                </> : <>
                    <VStack w="100%" px="20px" mt="12px" gap="16px">
                        <RadioGroup w="100%" value={selectedLang} onChange={setSelectedLang}>
                            <HStack justify="space-around">
                                {LANG.map((lang) => (
                                    <Radio value={lang} isDisabled={isLangDisabled(lang)}>{lang}</Radio>
                                ))}
                            </HStack>
                        </RadioGroup>
                        <Select
                            placeholder="Chapitres"
                            colorScheme="teal"
                            value={selectedChapter}
                            onChange={(e) => setSelectedChapter(Number(e.target.value))}
                        >
                            {numberToArray(nbChaters).map((chapitre) => (
                                <option value={chapitre}>Chapitre {chapitre}</option>
                            ))}
                        </Select>
                        <Button
                            w="100%"
                            colorScheme="teal"
                            isDisabled={!selectedChapter || isLangDisabled(selectedLang)}
                            onClick={goToChapter}
                        >
                            Lire
                        </Button>
                    </VStack>
                </>}
            </VStack>
        </AppLayout>
    );
};
