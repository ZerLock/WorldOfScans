import * as React from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

interface PaginationSelectorProps {
    prevDisabled: boolean;
    nextDisabled: boolean;
    onPrev: () => void;
    onNext: () => void;
    children?: JSX.Element;
}

export const PaginationSelector = ({ onPrev, onNext, prevDisabled, nextDisabled, children }: PaginationSelectorProps) => (
    <>
        <HStack w={children !== undefined ? '100%' : ''} justify="space-between">
            <IconButton colorScheme="blue" aria-label="Chapitre precedent" icon={<ArrowBackIcon />} isDisabled={prevDisabled} onClick={onPrev} />
            {children}
            <IconButton colorScheme="blue" aria-label="Chapitre suivant" icon={<ArrowForwardIcon />} isDisabled={nextDisabled} onClick={onNext} />
        </HStack>
    </>
);
