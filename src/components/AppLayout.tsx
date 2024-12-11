import React from 'react';
import { Box } from '@chakra-ui/react';
import { DESKTOP_MAX_W } from '../style';

interface AppLayoutProps {
    children: JSX.Element;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
    <Box
        w="100%"
        maxW={DESKTOP_MAX_W}
        mx="auto"
        bg="white"
    >
        {children}
    </Box>
);
