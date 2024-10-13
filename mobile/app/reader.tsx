import React, { useEffect } from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import { chapterKeeperKey } from "@/utils/utils";
import { setValue } from "@/utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fetchMangaData } from "@/utils/api";

export default function ReaderView() {
    const router = useRouter();
    let { mangaName, chapter, chapters } = useLocalSearchParams();

    useEffect(() => {
        const bootstrap = async () => {
            const res = await fetchMangaData(mangaName as string);
            chapters = res[Number(chapter)];
        };

        setValue(chapterKeeperKey(mangaName as string), chapter);
        if (chapters === undefined) {
            bootstrap();
        }
    }, [mangaName, chapter, chapters]);

    const goToPrevChapter = () => {
        // navigation.navigate('Reader', { manga, chapter: chapter - 1 });
    };

    const goToNextChapter = () => {
        // navigation.navigate('Reader', { manga, chapter: chapter + 1 });
    };

    const goToChapterSelection = () => {
        // navigation.navigate('ChapterSelection', { manga });
    };

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={(chapters as string).split(',')}
                    renderItem={({ item, index }) => (
                        <Image
                            key={index}
                            source={{ uri: item }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1,
    },
});
