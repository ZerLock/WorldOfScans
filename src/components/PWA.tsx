import React from 'react';
import { useEffect } from 'react';
import { useReactPWAInstall } from '../libs/pwa';
import Logo from '../resources/logo.png';
import consts from '../utils/consts';

export const PWA = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    useEffect(() => {
        if (supported() && !isInstalled()) {
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
