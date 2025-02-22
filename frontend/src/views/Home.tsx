import { Analytics } from "@vercel/analytics/react";
import { AppLayout } from "../components/AppLayout";
import { Navbar } from "../components/Navbar";
import { IoSettingsOutline, IoCalendarClearOutline, IoAppsOutline, IoHeartOutline, IoCalendarClear, IoApps, IoHeart, IoSettings } from "react-icons/io5";
import { Flex, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HomeTopbar as V2HomeTopbar } from "../components/HomeTopbar";
import consts from "../utils/consts";
import { Home as HomeAcceuil } from "./home/Home";
import { Scans } from "./home/Scans";
import { Saved } from "./home/Saved";
import { Settings } from "./home/Settings";
import { useTranslation } from "react-i18next";

export const App = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState(0);
    const [navbarH, setNavbarH] = useState(0);

    const navbarItems = [
        {
            name: t('nav.home'),
            icon: section === 0 ? <IoCalendarClear color="black" /> : <IoCalendarClearOutline color="grey" />,
            textColor: section === 0 ? 'black' : 'grey',
            action: () => setSection(0),
        },
        {
            name: t('nav.scans'),
            icon: section === 1 ? <IoApps color="black" /> : <IoAppsOutline color="grey" />,
            textColor: section === 1 ? 'black' : 'grey',
            action: () => setSection(1)
        },
        {
            name: t('nav.saved'),
            icon: section === 2 ? <IoHeart color="black" /> : <IoHeartOutline color="grey" />,
            textColor: section === 2 ? 'black' : 'grey',
            action: () => setSection(2),
        },
        {
            name: t('nav.settings'),
            icon: section === 3 ? <IoSettings color="black" /> : <IoSettingsOutline color="grey" />,
            textColor: section === 3 ? 'black' : 'grey',
            action: () => setSection(3),
        },
    ];

    useEffect(() => {})

    return (
        <>
            <Analytics />
            <AppLayout>
                <Flex flexDir="column" minH="100vh" h="100%" overflowY="hidden">
                    <V2HomeTopbar name={section === 0 ? consts.APP_NAME : navbarItems[section].name} />
                    <Tabs mt="50px" flex={1} index={section} overflowY="scroll" pb={`${navbarH}px`}>
                        <TabPanels>
                            <TabPanel><HomeAcceuil parentSection={section} /></TabPanel>
                            <TabPanel><Scans /></TabPanel>
                            <TabPanel><Saved /></TabPanel>
                            <TabPanel><Settings /></TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Navbar onHeightChange={(height: number) => setNavbarH(height)} items={navbarItems} />
                </Flex>
            </AppLayout>
        </>
    );
};
