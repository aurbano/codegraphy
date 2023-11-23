import { Box } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

import InlineIcon from '../../../components/InlineIcon';

export interface OutputProps {
  outputs: string[];
}

function Output({ outputs }: OutputProps) {
  if (outputs.length === 0) {
    return null;
  }

  return (
    <Box
      position="relative"
      bg="gray.900"
      mt={4}
      rounded="sm"
      px={4}
      py={2}
      maxH="500px"
      overflow="auto"
      fontFamily="monospace"
      fontSize="xs"
      _before={{
        content: '" "',
        position: 'absolute',
        bg: 'blue.500',
        w: '3px',
        h: 5,
        top: -4,
        left: '50%',
        zIndex: -1,
      }}
    >
      <Box position="absolute" bottom={1} right={1} color="gray.400">
        <InlineIcon icon={<FaCheck />} mr={2} color="green.500" />
        0.0s
      </Box>
      {outputs.map((output) => (
        <Box key={output}>{output}</Box>
      ))}
    </Box>
  );
}

export default Output;
