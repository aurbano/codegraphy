import { Box } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';

import type { CodeCellModel } from '../../../../../api/schema';
import useIsDark from '../../../../../util/hooks/useIsDark';

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
  cell: CodeCellModel;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  const isDark = useIsDark();
  const isPython = cell.kernel === 'python3.9';

  return (
    <Box minW="300px" minH="100px" h="100%">
      <Editor
        defaultLanguage={isPython ? 'python' : 'typescript'}
        defaultValue={isPython ? sampleContentPy : sampleContentTs}
        theme={isDark ? 'vs-dark' : 'vs-light'}
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
};

export default CodeCell;
