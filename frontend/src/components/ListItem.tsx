import * as React from 'react';
import { useMemo } from 'react';
import { Button, HStack, IconButton, Text } from '@chakra-ui/react';

interface ListItemProps {
    content: string | JSX.Element;
    icon?: JSX.Element;
    principal: () => void;
    secondary?: () => void;
};

export const ListItem = ({ content, icon, principal, secondary }: ListItemProps) => {
    const hasSecondary = useMemo(() => (secondary !== undefined && icon !== undefined), [secondary, icon]);

    return (
        <>
            <HStack w="100%" justify="space-between" px="10px">
                    <Button w="100%" bgColor="transparent" _hover={{ bgColor: 'transparent' }} _active={{ bgColor: 'transparent' }} _focus={{ bgColor: 'transparent' }} onClick={principal}>
                        <Text w="100%" textAlign={hasSecondary ? 'start' : 'center'} overflow="hidden">{content}</Text>
                    </Button>
                    {hasSecondary && <IconButton aria-label="action" mr="20px" icon={icon} onClick={secondary} />}
            </HStack>
        </>
    );
};
