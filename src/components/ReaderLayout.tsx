import React from 'react';
import { Box } from '@chakra-ui/react';
import { DESKTOP_READER_MAX_W } from '../style';

interface ReaderLayoutProps {
    children: JSX.Element;
}

export const ReaderLayout = ({children}: ReaderLayoutProps) => (
    <Box w="100%" maxW={DESKTOP_READER_MAX_W}>
        {children}
    </Box>
);
