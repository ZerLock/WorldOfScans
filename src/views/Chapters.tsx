import React from 'react';
import { useEffect, useState } from "react";
import { Text, VStack, Spinner, Button, Image, Select, RadioGroup, HStack, Radio } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getValue } from "../utils/storage";
import utils from "../utils/utils";
import { Topbar } from "../components/Topbar";
import { AppLayout } from '../components/AppLayout';
import consts from '../utils/consts';
import { TextEllipsis } from '../components/TextEllipsis';
import { EngineContext } from '../libs/engine/EngineContext';

export const Chapters = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [nbChapters, setNbChapters] = useState<number>(0);
    const [selectedChapter, setSelectedChapter] = useState<number | undefined>(undefined);
    const [selectedLang, setSelectedLang] = useState<string>('fr');
    const manga = params.manga || '';

    useEffect(() => {
        const bootstrap = async () => {
            const tmp = await EngineContext.getNbChapters(manga);
            setNbChapters(tmp);
        };

        const getLastChapter = () => {
            const chapter = getValue<number>(utils.keys.chapterKeeperKey(manga));
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

    return (
        <AppLayout>
            <VStack justifyContent="center">
                <Topbar close={goToHome} content={manga} />
                <Image src={EngineContext.getCoverUrl(manga)} maxH="250px" px="10px" borderRadius="16px" />
                <TextEllipsis text={(consts.MANGAS as { [key: string]: string })[manga]} />
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
                {nbChapters === 0 ? <>
                    <Spinner mt="32px" />
                    <Text>Chargement des chapitres...</Text>
                </> : <>
                    <VStack w="100%" px="20px" mt="12px" gap="16px">
                        <RadioGroup w="100%" value={selectedLang} onChange={setSelectedLang}>
                            <HStack justify="space-around">
                                {consts.LANG.map((lang) => (
                                    <Radio key={lang} value={lang} isDisabled={isLangDisabled(lang)}>{lang}</Radio>
                                ))}
                            </HStack>
                        </RadioGroup>
                        <Select
                            placeholder="Chapitres"
                            colorScheme="blue"
                            value={selectedChapter}
                            onChange={(e) => setSelectedChapter(Number(e.target.value))}
                        >
                            {utils.numberToArray(nbChapters).map((chapitre) => (
                                <option key={chapitre} value={chapitre}>Chapitre {chapitre}</option>
                            ))}
                        </Select>
                        <Button
                            w="100%"
                            colorScheme="blue"
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
