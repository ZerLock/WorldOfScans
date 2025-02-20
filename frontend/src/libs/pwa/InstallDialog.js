import React from "react";
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image } from "@chakra-ui/react";
import InstallDialogAction from "./InstallDialogAction";

export default function InstallDialog(props) {
    return (
        <Modal isOpen={props.open} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.title || "Install Web App"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Box display="flex" alignItems="flex-start">
                    {!!props.logo && <>
                        <Box w="100%" display="flex" justifyContent="center">
                            <Image display="flex" justifySelf="center" src={props.logo} width="30%" alt="logo" />
                        </Box>
                    </>}
                </Box>
                {!!props.description && <>
                    <Text fontSize="18px" textAlign="center">{props.description}</Text>
                </>}
                </ModalBody>
                <InstallDialogAction platform={props.platform} onSubmit={props.onSubmit} onClose={props.onClose} />
            </ModalContent>
        </Modal>
    );
}
