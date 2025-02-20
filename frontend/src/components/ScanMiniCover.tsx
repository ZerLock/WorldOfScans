import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import utils from "../utils/utils";

interface ScanMiniCoverProps {
    name: string;
    imageUrl: string;
    action: () => void;
}

export const ScanMiniCover = ({ name, imageUrl, action }: ScanMiniCoverProps) => {
    const [color, setColor] = useState('160, 160, 160');

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;

        img.onload = () => {
            const [r, g, b] = utils.cover.getMainColor(img);
            setColor(`${r}, ${g}, ${b}`);
        }
    }, [imageUrl]);

    const getTruncatedText = (text: string, maxChars: number) => {
        return text.length <= maxChars ? text : `${text.slice(0, maxChars)}...`;
    };

    return (
        <Box
            _hover={{ cursor: 'pointer' }}
            onClick={action}
            position="relative"
            width="100%"
            paddingBottom="180%" // 5:9 aspect ratio (9/5 = 1.8)
            borderRadius={8}
            backgroundImage={imageUrl}
            backgroundPosition="center"
            backgroundSize="cover"
        >
            <Box
                borderRadius={8}
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height="50%"
                backgroundImage={`linear-gradient(180deg, rgba(${color}, 0) 0%, rgba(${color}, 0.5) 33.04%, rgba(${color}, 0.9) 66.09%, rgba(${color}, 1) 100%)`}
            >
                <Text
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    py={2}
                    color="white"
                    fontWeight={900}
                    textAlign="center"
                    fontSize="12px"
                    textOverflow="ellipsis"
                    px={2}
                >
                    {getTruncatedText(name.toUpperCase(), 20)}
                </Text>
            </Box>
        </Box>
    );
}
