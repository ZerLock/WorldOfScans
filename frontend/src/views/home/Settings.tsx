import { Box, Button, Flex, Heading, useToast, VStack } from "@chakra-ui/react";
import { Switch } from "../../components/Switch";
import { useEffect, useState } from "react";
import { defaultSettings, getSettings, saveSettings, Settings as TSettings } from "../../utils/settings";
import { useReactPWAInstall } from "../../libs/pwa";
import consts from "../../utils/consts";
import Logo from '../../resources/logo.png';

export const Settings = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
    const toast = useToast();
    const [settings, setSettings] = useState<TSettings>(defaultSettings());

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const updateInstallationPopup = (value: boolean) => {
        setSettings({ ...settings, displayInstallationPopup: value });
        saveSettings({ ...settings, displayInstallationPopup: value });
    };

    const resetSettings = () => {
        setSettings(defaultSettings());
        saveSettings(defaultSettings());
        toast({
            title: 'Les réglages ont été réinitialisé',
            position: 'top',
            duration: 1500,
        });
    };

    const clearHistory = () => {
        localStorage.setItem(consts.HISTORY_KEY, [] as any);
        toast({
            title: `L'historique a été vidé`,
            position: 'top',
            duration: 1500,
        });
    };

    const installAppPwa = () => {
        if (supported() && !isInstalled()) {
            pwaInstall({
                title: consts.APP_NAME,
                description: "Installez cette application pour une meilleure experience",
                logo: Logo,
            }).then(() => {}).catch(() => {});
        }
    };

    return (
        <Flex flexDir="column" fontSize="14px" h="80vh" justify="space-between">
            <Box>
                <VStack justify="space-between" gap="16px">
                    <Switch text="Installation pop-up" value={settings.displayInstallationPopup} onChange={updateInstallationPopup} />
                    <Button fontSize="14px" colorScheme="blue" w="100%" onClick={installAppPwa}>Installer l'application</Button>
                    <Button fontSize="14px" colorScheme="red" variant="outline" w="100%" onClick={resetSettings}>Réinitialiser les réglages</Button>
                    <Button fontSize="14px" colorScheme="red" w="100%" onClick={clearHistory}>Supprimer l'historique</Button>
                </VStack>
            </Box>
            <VStack gap={4}>
                <Heading fontSize="18px" w="100%">Informations:</Heading>
                <VStack gap={4}>
                    <li><b>Source des images:</b><br />Cette application est uniquement dédiée à l'indexation de contenu et ne stocke aucune image, ni fichier en interne. Tout le contenu affiché provient de sources extenes.</li>
                    <li><b>Aucun but lucratif</b><br />Cette application est entièrement gratuite, sans publicités ni achats intégrés. Aucun revenu n'est généré par le biais de ce site, qui a un objectif purement non-commercial.</li>
                    <li style={{ width: '100%' }}><b>Projet Open Source:</b><br /><a style={{ color: 'blue' }} href="https://github.com/ZerLock/WorldOfScans" target="_blank" rel="noreferrer" >https://github.com/ZerLock/WorldOfScans</a></li>
                </VStack>
            </VStack>
        </Flex>
    );
}
