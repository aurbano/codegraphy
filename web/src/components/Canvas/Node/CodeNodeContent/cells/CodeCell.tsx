import { Box } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import { useContext } from 'react';

import { useReadCellContentsApiCellsGet } from '../../../../../api';
import type { CodeCellModel } from '../../../../../api/schema';
import { GraphContext } from '../../../../../pages/GraphEditor/GraphLoader/GraphContext';
import useIsDark from '../../../../../util/hooks/useIsDark';

export interface CodeCellProps {
  cell: CodeCellModel;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  const isDark = useIsDark();
  const { graphPath } = useContext(GraphContext);
  const isPython = cell.kernel === 'python3.9';

  const { data: response } = useReadCellContentsApiCellsGet(
    {
      f: graphPath,
      cell_id: cell.id,
    },
    {
      query: {
        queryKey: ['cell', graphPath, cell.id],
      },
    },
  );

  return (
    <Box minW="300px" minH="100px" h="100%">
      <Editor
        defaultLanguage={isPython ? 'python' : 'typescript'}
        defaultValue={response ? response.data : ''}
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
