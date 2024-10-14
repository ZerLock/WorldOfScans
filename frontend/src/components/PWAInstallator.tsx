import React from 'react';
import { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

export const PWAInstallator = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const isAppInstalled = () => {
            return (
                window.matchMedia("(display-mode: standalone)").matches ||
                (window.navigator as any).standalone === true
            );
        };

        if (!isAppInstalled()) {
            const handleBeforeInstallPrompt = (e: Event) => {
                e.preventDefault();
                setDeferredPrompt(e);
                onOpen();
            };

            window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

            return () => {
                window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            };
        }
    }, [onOpen]);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            const promptEvent = deferredPrompt as any;
            promptEvent.prompt();

            const { outcome } = await promptEvent.userChoice;
            if (outcome === "accepted") {
                console.log("L'utilisateur a accepté l'installation");
            } else {
                console.log("L'utilisateur a refusé l'installation");
            }

            setDeferredPrompt(null);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Installer l'application</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Voulez-vous installer l'application sur votre appareil ?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleInstallClick}>
                        Installer
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
