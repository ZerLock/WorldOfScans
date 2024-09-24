import * as React from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

interface PaginationSelectorProps {
    prevDisabled: boolean;
    nextDisabled: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export const PaginationSelector = ({ onPrev, onNext, prevDisabled, nextDisabled }: PaginationSelectorProps) => (
    <>
        <HStack>
            <IconButton colorScheme="teal" aria-label="Chapitre precedent" icon={<ArrowBackIcon />} isDisabled={prevDisabled} onClick={onPrev} />
            <IconButton colorScheme="teal" aria-label="Chapitre suivant" icon={<ArrowForwardIcon />} isDisabled={nextDisabled} onClick={onNext} />
        </HStack>
    </>
);
