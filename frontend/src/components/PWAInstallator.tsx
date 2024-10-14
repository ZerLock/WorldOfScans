import React, { useEffect } from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { usePWAInstall } from 'react-use-pwa-install';
import { APP_NAME } from '../utils/consts';

export const PWAInstallator = () => {
    const install = usePWAInstall();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (install) {
            onOpen();
        }
    }, [install, onOpen])

    return (
        <>
            {install && <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Installer {APP_NAME}
                        </ModalHeader>

                        <ModalCloseButton />

                        <ModalBody>
                            <p>Vous pouvez installer l'application sur votre appareil pour une meilleur experience.</p>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue.500" onClick={install}>Installer</Button>
                            <Button onClick={onClose}>Annuler</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>}
        </>
    );
}
