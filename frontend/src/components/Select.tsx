import { HStack, Text, Select as CSelect } from "@chakra-ui/react";

interface SelectProps {
    text: string;
    value: string;
    values: string[];
    onChange: (value: 'fr' | 'en') => void;
}

export const Select = ({ text, value, values, onChange }: SelectProps) => (
    <HStack w="100%" align="center" justify="space-between">
        <Text fontSize="16px">{text}</Text>
        <CSelect fontSize="16px" w="auto" value={value} onChange={(e) => onChange(e.target.value as 'en' | 'fr')}>
            {values.map((value) => (
                <option value={value}>{value.toUpperCase()}</option>
            ))}
        </CSelect>
    </HStack>
);
