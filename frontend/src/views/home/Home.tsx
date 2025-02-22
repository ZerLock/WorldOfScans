import { AspectRatio, Image, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import utils from "../../utils/utils";
import { ScansGrid } from "../../components/ScansGrid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HomeProps {
    parentSection: number;
}

export const Home = ({ parentSection }: HomeProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [section, setSection] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [randomSelection, setRandomSelection] = useState<string[]>([]);
    const [populaires, setPopulaires] = useState<string[]>([]);

    useEffect(() => {
        setHistory(utils.getHistory());
    }, [parentSection])

    useEffect(() => {
        setRandomSelection(utils.getRandomScans());
        setPopulaires([
            'Berserk',
            'Shingeki no Kyojin',
            'Chainsaw man',
            'One Piece',
            'Solo Leveling',
            'Tokyo Ghoul',
            'One punch man',
            'Demon Slayer',
            'Jujutsu Kaisen',
            'My Hero Academia',
            'Naruto',
            'Vagabond',
            'Death Note',
            'bleach',
            'Horimiya',
            'Vinland Saga',
            'The Promised Neverland',
            'Spy X Family',
            'Fullmetal Alchemist',
            'Hunter x Hunter',
            '20th Century boys',
            'A Silent Voice',
            'Fairy Tail',
            'Monster',
        ]);
    }, []);

    const goToManga = (name: string) => {
        navigate(`/manga/${name}/chapter`);
    };

    const tabs = {
        'Historique': <ScansGrid items={history} action={goToManga} fallbackText={t('home.empty.history')} />,
        'Populaire': <ScansGrid items={populaires} action={goToManga} fallbackText={t('home.empty.broken')} />,
        'Découvrir': <ScansGrid items={randomSelection} action={goToManga} fallbackText={t('home.empty.broken')} />,
    };

    const tabsTranslation = {
        'Historique': t('home.tabs.history'),
        'Populaire': t('home.tabs.trending'),
        'Découvrir': t('home.tabs.discover'),
    };

    return (
        <>
            <Stack gap="16px">
                <AspectRatio ratio={5/2}>
                    {/* @TODO: better announcements management */}
                    <Image src="/announcements/v2.png" objectFit="cover" borderRadius={8} />
                </AspectRatio>
                <Tabs index={section} onChange={setSection} align="center" variant="solid-rounded" colorScheme="transparent">
                    <TabList gap={2}>
                        {Object.keys(tabs).map((tab, index) => (
                            <Tab fontSize={14} borderWidth={1} borderColor="black" bgColor={section === index ? 'black' : 'transparent'} borderRadius={8} key={tab}>{(tabsTranslation as any)[tab]}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {Object.values(tabs).map((value, index) => (
                            <TabPanel key={index}>
                                {value}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Stack>
        </>
    );
}
