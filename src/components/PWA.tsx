import React from 'react';
import { useEffect } from 'react';
import { useReactPWAInstall } from '../libs/pwa';
import Logo from '../resources/logo.png';
import consts from '../utils/consts';
import { getSettings } from '../utils/settings';

export const PWA = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    useEffect(() => {
        const settings = getSettings();

        if (supported() && !isInstalled() && settings.displayInstallationPopup) {
            pwaInstall({
                title: consts.APP_NAME,
                description: "Installez cette application pour une meilleure experience",
                logo: Logo,
            }).then(() => {}).catch(() => {});
        }
    });

    return (
        <></>
    );
}
