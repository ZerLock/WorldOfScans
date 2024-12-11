import * as React from "react"
import { useMemo, useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Switch,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import consts from "../utils/consts";
import utils from "../utils/utils";
import { ListItem } from "../components/ListItem";
import { AppLayout } from "../components/AppLayout";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { setValue } from "../utils/storage";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import debounce from 'lodash.debounce';
import { Analytics } from "@vercel/analytics/react";
import { HomeTopbar } from "../components/HomeTopbar";

export const App = () => {
    const navigate = useNavigate();
    const [savedMangas, setSavedMangas] = useState<string[]>([]);
    const [showOnlySaved, setShowOnlySaved] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const debounceSearch = useMemo(() => {
        return debounce(handleSearch, 500);
    }, []);

    useEffect(() => {
        const saved = utils.getSavedMangas();
        setSavedMangas(saved);

        const isShowOnlySaved = localStorage.getItem(consts.SHOW_ONLY_SAVED_KEY);
        if (isShowOnlySaved) {
            setShowOnlySaved(isShowOnlySaved === "true");
        }

        return () => {
            debounceSearch.cancel();
        };
    }, [debounceSearch]);

    const goToChapterSelection = (manga: string) => {
        navigate(`/manga/${manga}/chapter`);
    };

    const changeMangaSavedStatus = (manga: string): void => {
        const key = utils.keys.mangaSavedKey(manga);
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            setSavedMangas(old => old.filter((m) => m !== manga));
        } else {
            localStorage.setItem(key, "true");
            setSavedMangas(old => [...old, manga]);
        }
    };

    const filterMangaList = () => {
        setShowOnlySaved(old => !old);
        setValue<boolean>(consts.SHOW_ONLY_SAVED_KEY, !showOnlySaved);
    };

    const clearSearch = () => {
        setSearch('');
        const el = document.getElementById('search-input');
        if (el) {
            //@ts-ignore
            el.value = '';
        }
    }

    const isMangaSaved = React.useCallback((manga: string) => {
        return savedMangas.includes(manga);
    }, [savedMangas]);

    const mangaList = useMemo(() => {
        const beforeSearch = showOnlySaved
            ? Object.keys(consts.MANGAS).filter(isMangaSaved)
            : Object.keys(consts.MANGAS);
        if (!search) {
            return beforeSearch;
        }
        return beforeSearch.filter((manga) => manga.toLowerCase().includes(search.toLowerCase()));
    }, [showOnlySaved, search, isMangaSaved]);

    const boldSubstrInText = (text: string, substr: string): JSX.Element => {
        const textArray = text.split(RegExp(substr, "ig"));
        const match = text.match(RegExp(substr, "ig"));

        return (
            <span>
                {textArray.map((item, index) => (
                    <span key={`${item}-${index}`}>
                        {item}
                        {index !== textArray.length - 1 && match && (
                            <b style={{ color: 'blue' }}>{match[index]}</b>
                        )}
                    </span>
                ))}
            </span>
        );
    };

    return (
        <>
            <Analytics />
            <AppLayout>
                <Box textAlign="center" fontSize="xl" h="100%">
                    <VStack w="100%" px="10px" gap="24px">
                        <HomeTopbar />
                        <VStack w="100%">
                            <InputGroup w="100%" px="20px">
                                <InputLeftElement ml="20px">
                                    <Search2Icon color="gray" />
                                </InputLeftElement>
                                <Input id="search-input" colorScheme="blue" placeholder="Rechercher" onChange={debounceSearch} />
                                {search && <>
                                    <InputRightElement>
                                        <IconButton
                                            aria-label="clear search"
                                            backgroundColor="transparent"
                                            mr="40px"
                                            icon={<CloseIcon />}
                                            _hover={{
                                                backgroundColor: 'transparent',
                                                color: 'red.500',
                                            }}
                                            onClick={clearSearch}
                                        />
                                    </InputRightElement>
                                </>}
                            </InputGroup>
                            <HStack w="100%" px="30px" justify="space-between">
                                <Text fontSize="13px">Uniquement les mangas sauvegardés</Text>
                                <Switch colorScheme="blue" isChecked={showOnlySaved} onChange={filterMangaList} />
                            </HStack>
                        </VStack>
                        <VStack w="100%" overflowY="scroll" maxH="71vh">
                            {mangaList.length > 0 ? <>
                                {mangaList.map((manga, index) => (
                                    <ListItem
                                        key={index}
                                        content={boldSubstrInText(manga, search)}
                                        principal={() => goToChapterSelection(manga)}
                                        icon={isMangaSaved(manga) ? <FaHeart /> : <FaRegHeart />}
                                        secondary={() => changeMangaSavedStatus(manga)}
                                    />
                                ))}
                            </> : <>
                                <Text><b>"{search}"</b> not found...</Text>
                            </>}
                        </VStack>
                    </VStack>
                </Box>
            </AppLayout>
        </>
    );
};
