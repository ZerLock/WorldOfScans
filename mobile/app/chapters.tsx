import React, { useEffect, useMemo, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, Image as RImage, FlatList, View, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Chapters } from '@/types/Chapters';
import { fetchMangaData } from '@/utils/api';
import { getValue } from '@/utils/storage';
import { chapterKeeperKey, coverUrl } from '@/utils/utils';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ChaptersView() {
    const router = useRouter();
    const navigation = useNavigation();
    const { mangaName } = useLocalSearchParams();
    const [chapters, setChapters] = useState<Chapters>({});
    const [lastChapter, setLastChapter] = useState<number>(0);

    useEffect(() => {
        const bootstrap = async () => {
            //navigation.setOptions({ title: mangaName as string })
            const res = await fetchMangaData(mangaName as string);
            setChapters(res);
        };

        const getLastChapter = async () => {
            const chapter = await getValue<number>(chapterKeeperKey(mangaName as string));
            if (chapter) {
                setLastChapter(chapter);
            }
        };

        bootstrap();
        getLastChapter();
    }, [mangaName]);

    const goToChapter = (chapter: number) => {
        router.push({
            pathname: '/reader',
            params: {
                mangaName: mangaName as string,
                chapter,
                chapters: chapters[chapter],
            },
        });
    };

    const goToLastChapter = () => {
        if (lastChapter > 0) {
            router.push({
                pathname: '/reader',
                params: {
                    mangaName: mangaName as string,
                    chapter: lastChapter,
                },
            });
        }
    };

    const goToHome = () => {
        router.push('/');
    };

    return (
        <GestureHandlerRootView>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#FFFFFF', dark: '#000000' }}
                headerImage={<RImage style={styles.cover} source={{ uri: coverUrl(mangaName as string) }} />}
            >
                <TouchableOpacity style={styles.goToLastChapter} onPress={goToLastChapter}>
                    <Text style={styles.retake_text}>{lastChapter > 0 ? `Reprendre au chapitre ${lastChapter}` : "Aucun chapitre n'a été commencé"}</Text>
                </TouchableOpacity>
                {Object.keys(chapters).length === 0 ? <>
                    <ActivityIndicator size="large" />
                </> : <>
                    {Object.keys(chapters).map((item, index) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity onPress={() => goToChapter(Number(item))}>
                                <Text style={styles.item_text}>Chapitre {item}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item_button}>
                                <Text style={styles.item_button_text}>Télécharger</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>}
            </ParallaxScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    cover: {
        height: 250,
    },
    retake_text: {
        textAlign: 'center',
        color: 'grey',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        fontSize: 18,
    },
    goToLastChapter: {
        marginTop: -10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 4,
    },
    item_text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    item_button: {
        backgroundColor: '#CBD5E0',
        height: 40,
        width: 100,
        borderRadius: 8,
        justifyContent: 'center',
    },
    item_button_text: {
        textAlign: 'center',
    },
});
