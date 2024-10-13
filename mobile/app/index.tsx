import { Image, StyleSheet, Platform, Text, View, SafeAreaView, TextInput, FlatList, Button, Switch } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useMemo, useState } from 'react';
import { APP_NAME, MANGAS, SHOW_ONLY_SAVED_KEY } from '@/utils/consts';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';
import { setValue } from '@/utils/storage';
import { getSavedManga, managSaved, urlSpacesUnparser } from '@/utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    const [savedManga, setSavedManga] = useState<string[]>([]);
    const [showOnlySaved, setShowOnlySaved] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const bootstrap = async () => {
            const tmp = await getSavedManga();
            setSavedManga(tmp);

            const isShowOnlySaved = await AsyncStorage.getItem(SHOW_ONLY_SAVED_KEY);
            if (isShowOnlySaved) {
                setShowOnlySaved(isShowOnlySaved === 'true');
            }
        };
        bootstrap();

        return () => {
            debounceSearch.cancel();
        };
    }, []);

    const goToChapterSelection = (manga: string): void => {
        router.push({
            pathname: '/chapters',
            params: {
                mangaName: manga,
            },
        });
    };

    const changeMangaSavedStatus = async (manga: string) => {
        const key = managSaved(manga);
        if (await AsyncStorage.getItem(key)) {
            await AsyncStorage.removeItem(key);
           setSavedManga(old => old.filter(m => m !== manga));
        } else {
            await AsyncStorage.setItem(key, 'true');
            setSavedManga(old => [...old, manga]);
        }
    };

    const filterMangaList = () => {
        setShowOnlySaved(old => !old);
        setValue(SHOW_ONLY_SAVED_KEY, !showOnlySaved);
    };

    const isMangaSaved = (manga: string): boolean => {
        return savedManga.includes(manga);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const debounceSearch = useMemo(() => {
        return debounce(handleSearch, 500);
    }, []);

    const mangaList = useMemo(() => {
        const beforeSearch = showOnlySaved ? MANGAS.filter(isMangaSaved) : MANGAS;
        if (!search) {
            return beforeSearch;
        }
        return beforeSearch.filter(manga => manga.toLowerCase().includes(search.toLowerCase()));
    }, [showOnlySaved, search]);

    const boldSubstrInText = (text: string, substr: string): JSX.Element => {
        const textArray = text.split(RegExp(substr, "ig"));
        const match = text.match(RegExp(substr, "ig"));

        return (
            <Text>
                {textArray.map((item, index) => (
                    <Text key={`${item}-${index}`}>
                        {item}
                        {index !== textArray.length - 1 && match && (
                            <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                                {match[index]}
                            </Text>
                        )}
                    </Text>
                ))}
            </Text>
        );
    };

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.view}>
                <TextInput placeholder="Rechercher" style={styles.search} onChangeText={debounceSearch} />
                <View style={styles.filter}>
                    <Text style={styles.filter_text}>Uniquement les mangas sauvegardés</Text>
                    <Switch value={showOnlySaved} onValueChange={filterMangaList} />
                </View>
                {mangaList.length > 0 ? <>
                    <FlatList style={styles.list} data={mangaList} renderItem={({ item, index }) => (
                        <>
                            <View style={[styles.item, index === mangaList.length - 1 && styles.item_last]}>
                                <TouchableOpacity onPress={() => goToChapterSelection(item)}>
                                    <Text>{boldSubstrInText(urlSpacesUnparser(item), search)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveBtn} onPress={() => changeMangaSavedStatus(item)}>
                                    <Text style={styles.saveBtn_Text}>{ isMangaSaved(item) ? "Saved" : "Save" }</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}></FlatList>
                </> : <>
                    <Text style={styles.notFound}>
                        <Text style={{ fontWeight: 'bold' }}>"{search}"</Text> introuvable...
                    </Text>
                </>}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    view: {
        minHeight: '100%',
        backgroundColor: 'white',
    },
    heading: {
        width: '100%',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 25
    },
    search: {
        height: 50,
        margin: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        padding: 8
    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    filter_text: {
        fontSize: 14,
    },
    list: {
        padding: 20,
        paddingTop: 0,
    },
    item: {
        marginVertical: 4,
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        fontSize: 14,
    },
    item_last: {
        marginBottom: 190,
    },
    saveBtn: {
        backgroundColor: '#CBD5E0',
        height: 40,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
    },
    saveBtn_Text: {
        textAlign: 'center',
    },
    notFound: {
        textAlign: 'center',
        width: '100%',
        fontSize: 24,
        marginTop: 64
    }
});
