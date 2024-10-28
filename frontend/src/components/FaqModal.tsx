import React from 'react';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Box,
    VStack,
} from '@chakra-ui/react';

interface FaqModalProps {
    isOpen: boolean;
    onClose: () => void;
};

export const FaqModal = ({ isOpen, onClose }: FaqModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader><b>FAQ</b></ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody ml="20px">
                <Box as="ul" listStyleType="inline">
                    <VStack gap={4}>
                        <li><b>Source des images:</b><br />Cette application est uniquement dédiée à l'indexation de contenu et ne stocke aucune image, ni fichier en interne. Tout le contenu affiché provient de sources extenes.</li>
                        <li><b>Aucun but lucratif</b><br />Cette application est entièrement gratuite, sans publicités ni achats intégrés. Aucun revenu n'est généré par le biais de ce site, qui a un objectif purement non-commercial.</li>
                    </VStack>
                </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
        </ModalContent>
    </Modal>
);
