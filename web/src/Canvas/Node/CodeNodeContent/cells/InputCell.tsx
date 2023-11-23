import { Box, FormControl, Input } from '@chakra-ui/react';

import type { Cell } from '../../../types';

export interface InputCellProps {
  cell: Cell;
}

function InputCell({ cell }: InputCellProps) {
  if (cell.cell_type !== 'input') {
    return null;
  }

  return (
    <Box px={2} py={1} minW="150px">
      <FormControl>
        <Input
          type={cell.type}
          bg="gray.700"
          value={cell.value}
          placeholder="Input..."
          onKeyDown={(e) => e.stopPropagation()}
        />
      </FormControl>
    </Box>
  );
}

export default InputCell;
