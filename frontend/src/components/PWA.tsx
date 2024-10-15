import React from 'react';
import { useEffect } from 'react';
import { useReactPWAInstall } from '../libs/pwa';
import Logo from '../resources/logo.png';
import { APP_NAME } from '../utils/consts';

export const PWA = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    useEffect(() => {
        if (supported() && !isInstalled()) {
            pwaInstall({
                title: APP_NAME,
                description: "Installez cette application pour une meilleur experience",
                logo: Logo,
            }).then(() => {}).catch(() => {});
        }
    });

    return (
        <></>
    );
}
