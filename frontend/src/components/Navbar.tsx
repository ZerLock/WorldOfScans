import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { cloneElement, useEffect, useRef } from "react";
import { DESKTOP_MAX_W } from "../style";

interface NavbarItem {
    name: string;
    icon: JSX.Element;
    textColor: string;
    action: () => void;
}

interface NavbarProps {
    items: NavbarItem[];
    onHeightChange: (height: number) => void;
}

export const Navbar = ({ items, onHeightChange }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            onHeightChange(ref.current.offsetHeight);
        }
    }, [ref, onHeightChange])

    return (
        <HStack ref={ref} pos="fixed" bottom="0" w="100%" ml={{ base: '0', md: '-30%' }} px={{ base: '0px', md: '30%' }} bgColor="white">
            {items.map((item) => (
                <Button _hover={{ background: 'transparent' }} key={item.name} p={2} pb={{ base: 7, md: 5 }} w="100%" h="100%" colorScheme="transparent" onClick={item.action} aria-label={item.name}>
                    <VStack gap={0}>
                        {cloneElement(item.icon, { size: 24 })}
                        <Text color={item.textColor} fontSize={12}>{item.name.toLowerCase()}</Text>
                    </VStack>
                </Button>
            ))}
        </HStack>
    );
}
