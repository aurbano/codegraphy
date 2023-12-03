import { Box } from '@chakra-ui/react';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import type { CodeCellModel } from '../../../../../api/schema';
import CodeEditor from '../../../../CodeEditor';

loader.config({ monaco });

export interface CodeCellProps {
  cell: CodeCellModel;
}

const CodeCell = ({ cell }: CodeCellProps) => (
  <Box minW="300px" minH="100px" h="100%">
    <CodeEditor cell={cell} />
  </Box>
);

export default CodeCell;
