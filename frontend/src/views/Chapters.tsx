import { Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChapterSelector } from "../components/ChapterSelector";
import { fetchMangaData } from "../utils/api";
import { Chapters as TChapters } from "../types/Chapters";

export const Chapters = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [chapters, setChapters] = useState<TChapters>({});
    const manga = params.manga || '';

    useEffect(() => {
        const bootstrap = async () => {
            const res = await fetchMangaData(manga);
            setChapters(res);
        };

        bootstrap();
    }, [manga]);

    const goToChapter = (chapter: number) => {
        navigate(`/manga/${manga}/chapter/${chapter}`);
    };

    const nbChaters = useMemo(() => Object.keys(chapters).length, [chapters]);

    return (
        <>
            <VStack justifyContent="center">
                <Heading>{manga}</Heading>
                {nbChaters === 0 ? <>
                    <Spinner marginTop="32px" />
                    <Text>Nous chargons les chapitres...</Text>
                </> : <>
                    <ChapterSelector nbChapters={nbChaters} onChange={goToChapter} />
                </>}
            </VStack>
        </>
    );
};
