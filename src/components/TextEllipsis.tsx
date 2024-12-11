import { useState } from "react";
import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Link,
} from "@chakra-ui/react";

interface TextEllipsisProps {
    text: string;
    maxChars?: number;
}

export const TextEllipsis = ({ text, maxChars = 200 }: TextEllipsisProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isTruncated] = useState(true);

    const getTruncatedText = (text: string, maxChars: number) => {
        return text.length <= maxChars ? text : `${text.slice(0, maxChars)}...`;
    };

    return (
      <Box>
            <Text w="100%" px="10px" textAlign="justify">
                {isTruncated ? getTruncatedText(text, maxChars) : text}
                {isTruncated && text.length > maxChars && (
                    <Link
                        color="blue.500"
                        onClick={onOpen}
                        textDecoration="underline"
                        cursor="pointer"
                        ml={1}
                    >
                        Voir plus.
                    </Link>
                )}
            </Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign="justify" maxH="50vh" overflowY="scroll" mt="20px">{text}</Text>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
      </Box>
    );
};
