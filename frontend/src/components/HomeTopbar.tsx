import React from 'react';
import { HStack, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import consts from '../utils/consts';
import { QuestionIcon } from '@chakra-ui/icons';
import { FaqModal } from './FaqModal';

export const HomeTopbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <HStack w="100%" mt="50px" px="20px">
                <Heading w="100%" flex="1" textAlign="start">{consts.APP_NAME}</Heading>
                <HStack>
                    <IconButton aria-label="foire aux questions (faq)" colorScheme="blue" onClick={onOpen}>
                        <QuestionIcon />
                    </IconButton>
                </HStack>
            </HStack>
            <FaqModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
