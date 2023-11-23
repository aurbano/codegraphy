import { Box } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';

import type { Cell } from '../../../types';

const sampleContentPy = `def add(num1, num2):
  sum = num1 + num2
  print(sum)
  return sum
`;

const sampleContentTs = `function getRandomInt() {
  return Math.floor(Math.random() * 10);
}
`;

export interface CodeCellProps {
  cell: Cell;
}

function CodeCell({ cell }: CodeCellProps) {
  if (cell.cell_type !== 'code') {
    return null;
  }

  const isPython = cell.kernel === 'python3.9';

  return (
    <Box minW="300px" minH="100px" h="100%">
      <Editor
        defaultLanguage={isPython ? 'python' : 'typescript'}
        defaultValue={isPython ? sampleContentPy : sampleContentTs}
        theme="vs-dark"
        options={{
          lineNumbersMinChars: 3,
          showFoldingControls: 'never',
          minimap: {
            enabled: false,
          },
        }}
      />
    </Box>
  );
}

export default CodeCell;
