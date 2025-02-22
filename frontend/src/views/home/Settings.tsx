import { Box, Button, Collapse, Flex, Heading, useToast, VStack } from "@chakra-ui/react";
import { Switch } from "../../components/Switch";
import { useEffect, useState } from "react";
import { defaultSettings, getSettings, saveSettings, Settings as TSettings } from "../../utils/settings";
import { useReactPWAInstall } from "../../libs/pwa";
import consts from "../../utils/consts";
import Logo from '../../resources/logo.png';
import { useTranslation } from "react-i18next";
import { Select } from "../../components/Select";

export const Settings = () => {
    const { t, i18n } = useTranslation<'translation'>();
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
    const toast = useToast();
    const [settings, setSettings] = useState<TSettings>(defaultSettings());
    const [developer, setDeveloper] = useState<boolean>(false);

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const updateInstallationPopup = (value: boolean) => {
        setSettings({ ...settings, displayInstallationPopup: value });
        saveSettings({ ...settings, displayInstallationPopup: value });
    };

    const updateInterfaceLanguage = (value: 'fr' | 'en') => {
        setSettings({ ...settings, lang: value });
        saveSettings({ ...settings, lang: value });
        i18n.changeLanguage(value);
    }

    const resetSettings = (displayToast: boolean = true) => {
        setSettings(defaultSettings());
        saveSettings(defaultSettings());
        if (displayToast) {
            toast({
                title: t('toast.settings'),
                position: 'top',
                duration: 1500,
            });
        }
        i18n.changeLanguage('fr');
    };

    const clearHistory = () => {
        localStorage.setItem(consts.HISTORY_KEY, [] as any);
        toast({
            title: t('toast.history'),
            position: 'top',
            duration: 1500,
        });
    };

    const clearCache = () => {
        localStorage.clear();
        resetSettings(false);
        toast({
            title: t('toast.cache'),
            position: 'top',
            duration: 1500,
        });
    };

    const installAppPwa = () => {
        if (supported() && !isInstalled()) {
            pwaInstall({
                title: consts.APP_NAME,
                description: t('install_popup'),
                logo: Logo,
            }).then(() => {}).catch(() => {});
        }
    };

    return (
        <Flex flexDir="column" fontSize="14px" h="80vh" justify="space-between">
            <Box>
                <VStack justify="space-between" gap="16px">
                    <Switch text={t('settings.installation_popup')} value={settings.displayInstallationPopup} onChange={updateInstallationPopup} />
                    <Select text={t('settings.ui_language')} value={settings.lang} values={['fr', 'en']} onChange={updateInterfaceLanguage} />
                    <Button fontSize="14px" colorScheme="blue" w="100%" onClick={installAppPwa}>{t('settings.install_app')}</Button>
                    <Switch text={t('settings.developer_mode')} value={developer} onChange={(value) => setDeveloper(value)} />
                    <Collapse in={developer} animateOpacity style={{ width: '100%' }}>
                        <VStack gap="16px">
                            <Button fontSize="14px" colorScheme="red" variant="outline" w="100%" onClick={() => resetSettings()}>{t('settings.reset_settings')}</Button>
                            <Button fontSize="14px" colorScheme="red" variant="outline" w="100%" onClick={clearHistory}>{t('settings.clear_history')}</Button>
                            <Button fontSize="14px" colorScheme="red" w="100%" onClick={clearCache}>{t('settings.clear_cache')}</Button>
                        </VStack>
                    </Collapse>
                </VStack>
            </Box>
            <VStack gap={4}>
                <Heading fontSize="18px" w="100%">{t('informations')}:</Heading>
                <VStack gap={4}>
                    <li><b>{t('settings.images_sources_title')}:</b><br />{t('settings.images_sources_desc')}</li>
                    <li><b>{t('settings.profit_title')}:</b><br />{t('settings.profit_desc')}</li>
                    <li style={{ width: '100%' }}><b>{t('settings.open_source_project')}:</b><br /><a style={{ color: 'blue' }} href="https://github.com/ZerLock/WorldOfScans" target="_blank" rel="noreferrer" >https://github.com/ZerLock/WorldOfScans</a></li>
                </VStack>
            </VStack>
        </Flex>
    );
}
