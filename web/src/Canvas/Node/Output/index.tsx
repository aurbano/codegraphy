import { Box } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

import InlineIcon from '../../../components/InlineIcon';
import type { CellCode } from '../../types';

export interface OutputProps {
  cell: CellCode;
}

function Output({ cell }: OutputProps) {
  const { outputs, execution_time: executionTime } = cell;

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
      fontFamily="monospace"
      fontSize="xs"
      shadow="lg"
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
      {typeof executionTime !== 'undefined' && (
        <Box position="absolute" bottom={1} right={1} color="gray.400">
          <InlineIcon icon={<FaCheck />} mr={2} color="green.500" />
          {executionTime}s
        </Box>
      )}
      <Box maxH="500px" overflow="auto">
        {outputs.map((output) => (
          <Box key={output}>{output}</Box>
        ))}
      </Box>
    </Box>
  );
}

export default Output;
