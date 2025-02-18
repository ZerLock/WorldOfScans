import { HStack, Text, Switch as CSwitch } from "@chakra-ui/react";

interface SwitchProps {
    text: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const Switch = ({ text, value, onChange }: SwitchProps) => (
    <HStack w="100%" align="center" justify="space-between">
        <Text fontSize="16px">{text}</Text>
        <CSwitch isChecked={value} onChange={(e) => onChange(e.target.checked)} />
    </HStack>
);
