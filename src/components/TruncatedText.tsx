import { useState } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

interface TruncatedTextProps {
    title: string;
    text: string;
    nbOfLines: number;
    bgColor: string;
}

export const TruncatedText = ({ title, text, nbOfLines, bgColor }: TruncatedTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const open = () => {
        setIsExpanded(true);
    };

    return (
        <Box mx="10px" p="15px" pb="8px" borderRadius={8} bgColor={bgColor} onClick={open}>
            <Heading fontSize="16px" fontWeight={900} mb={2}>{title}</Heading>
            {!isExpanded ? <>
                <Text
                    fontSize="14px"
                    noOfLines={nbOfLines}
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0))',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 50, rgba(0, 0, 0, 0)'
                    }}
                >
                    {text}
                </Text>
                <div className="fadeout"></div>
                <Box w="100%" display="flex" justifyContent="center" alignItems="center" _hover={{ cursor: 'pointer' }}>
                    <IoIosArrowDown size="16px" />
                </Box>
            </> : <Text fontSize="14px" pb="7px">{text}</Text>
            }
        </Box>
    );
};
