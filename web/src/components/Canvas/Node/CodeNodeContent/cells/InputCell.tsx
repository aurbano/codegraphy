import { Box, FormControl, Input } from '@chakra-ui/react';

import type { InputCellModel } from '../../../../../api/schema';
import useIsDark from '../../../../../util/hooks/useIsDark';

export interface InputCellProps {
  cell: InputCellModel;
}

const InputCell = ({ cell }: InputCellProps) => {
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
          onChange={() => {}}
        />
      </FormControl>
    </Box>
  );
};

export default InputCell;
