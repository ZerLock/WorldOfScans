import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react";
import debounce from 'lodash.debounce';
import { ScansGrid } from "../../components/ScansGrid";
import { useNavigate } from "react-router-dom";
import consts from "../../utils/consts";

export const Scans = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const clearSearch = () => {
        setSearch('');
        const el = document.getElementById('search-input');
        if (el) {
            //@ts-ignore
            el.value = '';
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const debounceSearch = useMemo(() => {
        return debounce(handleSearch, 500);
    }, []);

    useEffect(() => {
        return () => {
            debounceSearch.cancel();
        }
    }, [debounceSearch]);

    const goToManga = (name: string) => {
        navigate(`/manga/${name}/chapter`)
    };

    const mangaList = useMemo(() => {
        if (search.length === 0) {
            return [];
        }
        return Object.keys(consts.MANGAS).filter((manga) => manga.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    return (
        <Stack gap="16px">
            <InputGroup w="100%">
                <InputLeftElement>
                    <Search2Icon color="gray" />
                </InputLeftElement>
                <Input id="search-input" colorScheme="blue" placeholder="Rechercher (ex: One piece, Naruto...)" onChange={debounceSearch} />
                {search && <>
                    <InputRightElement>
                        <IconButton
                            aria-label="clear search"
                            backgroundColor="transparent"
                            mr="10px"
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
            <ScansGrid items={mangaList} action={goToManga} fallbackText="Les résultats de la recherche s'afficheront ici" />
        </Stack>
    );
}
