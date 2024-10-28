import * as React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

interface TopbarProps {
    close: () => void;
    content: string;
}

export const Topbar = ({ close, content }: TopbarProps) => (
    <>
        <HStack w="100%" px="10px" py="10px" borderBottom="1px" borderColor="gray.400">
            <IconButton colorScheme="blue" aria-label="go back" icon={<CloseIcon />} onClick={close} />
            <Text fontSize="18px" fontWeight="bold">{content}</Text>
        </HStack>
    </>
);
