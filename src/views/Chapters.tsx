import { Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findMaximumImageAvailable } from "../utils/utils";
import { ChapterSelector } from "../components/ChapterSelector";

export const Chapters = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [nbChapters, setNbChapters] = useState(0);
    const manga = params.manga || '';

    useEffect(() => {
        const bootstrap = async () => {
            const res = await findMaximumImageAvailable(manga);
            setNbChapters(res);
        };

        bootstrap();
    }, [manga]);

    const goToChapter = (chapter: number) => {
        navigate(`/manga/${manga}/chapter/${chapter}`);
    };

    return (
        <>
            <VStack justifyContent="center">
                <Heading>{manga}</Heading>
                {nbChapters === 0 ? <>
                    <Spinner marginTop="32px" />
                    <Text>Nous chargons les chapitres...</Text>
                </> : <>
                    <ChapterSelector nbChapters={nbChapters} onChange={goToChapter} />
                </>}
            </VStack>
        </>
    );
};
