import { Text, VStack, Spinner, Button } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChapterSelector } from "../components/ChapterSelector";
import { fetchMangaData } from "../utils/api";
import { Chapters as TChapters } from "../types/Chapters";
import { getValue } from "../utils/storage";
import { chapterKeeperKey } from "../utils/utils";
import { Topbar } from "../components/Topbar";

export const Chapters = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [chapters, setChapters] = useState<TChapters>({});
    const [lastChapter, setLastChapter] = useState<number>(0);
    const manga = params.manga || '';

    useEffect(() => {
        const bootstrap = async () => {
            const res = await fetchMangaData(manga);
            setChapters(res);
        };

        const getLastChapter = () => {
            const chapter = getValue<number>(chapterKeeperKey(manga));
            if (chapter) {
                setLastChapter(chapter);
            }
        };

        bootstrap();
        getLastChapter();
    }, [manga]);

    const goToChapter = (chapter: number) => {
        navigate(`/manga/${manga}/chapter/${chapter}`);
    };

    const goToLastChapter = () => {
        if (lastChapter > 0) {
            navigate(`/manga/${manga}/chapter/${lastChapter}`);
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    const nbChaters = useMemo(() => Object.keys(chapters).length, [chapters]);

    return (
        <>
            <VStack justifyContent="center">
                <Topbar close={goToHome} content={manga} />
                {nbChaters === 0 ? <>
                    <Spinner marginTop="32px" />
                    <Text>Nous chargons les chapitres...</Text>
                </> : <>
                    <ChapterSelector nbChapters={nbChaters} onChange={goToChapter}>
                        {lastChapter > 0 ? <Button bgColor="transparent" w="100%" textDecoration="underline" fontStyle="italic" textColor="gray" onClick={goToLastChapter}>Reprendre au chapitre {lastChapter}</Button> : <></>}
                    </ChapterSelector>
                </>}
            </VStack>
        </>
    );
};
