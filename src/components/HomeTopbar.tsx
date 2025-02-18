import { HStack, Image, Text } from "@chakra-ui/react";

interface HomeTopbarProps {
    name: string;
}

export const HomeTopbar = ({ name }: HomeTopbarProps) => (
    <HStack top={0} pos="fixed" zIndex={1} backgroundColor="white" w="100%" p={4} pb={2} alignItems="center">
        <Image src="/logo512.png" w={8} />
        <Text w="100%" fontWeight="bold">{name}</Text>
    </HStack>
);
