import { Box, FormControl, Input } from '@chakra-ui/react';

import useIsDark from '../../../../util/hooks/useIsDark';
import type { CellInput } from '../../../types';

export interface InputCellProps {
  cell: CellInput;
}

function InputCell({ cell }: InputCellProps) {
  const isDark = useIsDark();

  return (
    <Box px={2} py={1} minW="150px">
      <FormControl>
        <Input
          type={cell.type}
          bg={isDark ? 'muted.700' : 'muted.300'}
          color={isDark ? 'inherit' : 'muted.900'}
          value={cell.value}
          placeholder="Input..."
          onKeyDown={(e) => e.stopPropagation()}
        />
      </FormControl>
    </Box>
  );
}

export default InputCell;
