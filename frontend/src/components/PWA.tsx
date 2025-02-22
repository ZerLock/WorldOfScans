import React from 'react';
import { useEffect } from 'react';
import { useReactPWAInstall } from '../libs/pwa';
import Logo from '../resources/logo.png';
import consts from '../utils/consts';
import { getSettings } from '../utils/settings';
import { useTranslation } from 'react-i18next';

export const PWA = () => {
    const { t } = useTranslation();
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    useEffect(() => {
        const settings = getSettings();

        if (supported() && !isInstalled() && settings.displayInstallationPopup) {
            pwaInstall({
                title: consts.APP_NAME,
                description: t('install_popup'),
                logo: Logo,
            }).then(() => {}).catch(() => {});
        }
    });

    return (
        <></>
    );
}
