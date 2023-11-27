import { Box, FormControl, Input } from '@chakra-ui/react';
import { useState } from 'react';

import type { InputCellModel } from '../../../../../api/schema';
import useIsDark from '../../../../../util/hooks/useIsDark';

export interface InputCellProps {
  cell: InputCellModel;
  onUpdateValue: (value: string | number) => void;
}

const InputCell = ({ cell, onUpdateValue }: InputCellProps) => {
  const isDark = useIsDark();
  const [value, setValue] = useState(cell.value || '');

  return (
    <Box px={2} py={1} minW="150px">
      <FormControl>
        <Input
          type={cell.type}
          bg={isDark ? 'muted.700' : 'muted.100'}
          color={isDark ? 'inherit' : 'muted.900'}
          value={value || ''}
          placeholder="Input..."
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onUpdateValue(value)}
        />
      </FormControl>
    </Box>
  );
};

export default InputCell;
