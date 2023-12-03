import { Box } from '@chakra-ui/react';
import { Editor, loader } from '@monaco-editor/react';
import { useQueryClient } from '@tanstack/react-query';
import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';

import {
  useReadCellContentsApiCellsCellIdGet,
  useSaveCellContentsApiCellsCellIdPut,
} from '../../../../../api';
import type { CodeCellModel } from '../../../../../api/schema';
import QueryKeys from '../../../../../models/queryKeys';
import { useGraphContext } from '../../../../../pages/GraphEditor/GraphLoader/GraphContext';
import useIsDark from '../../../../../util/hooks/useIsDark';

loader.config({ monaco });

export interface CodeCellProps {
  cell: CodeCellModel;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  const isDark = useIsDark();
  const { graphPath } = useGraphContext();
  const queryClient = useQueryClient();
  const saveChangesTimerRef = useRef<number>();
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();

  const isPython = cell.kernel === 'python3.9';

  const { data: response } = useReadCellContentsApiCellsCellIdGet(
    cell.id,
    {
      f: graphPath,
    },
    {
      query: {
        queryKey: QueryKeys.GraphCell(graphPath, cell.id),
      },
    },
  );

  const updateCellMutation = useSaveCellContentsApiCellsCellIdPut({
    mutation: {
      onMutate: (data) => {
        queryClient.setQueryData(QueryKeys.GraphCell(graphPath, cell.id), data);
      },
    },
  });

  const onSaveChanges = (content: string) => {
    if (response?.data.content === content) {
      return;
    }

    updateCellMutation.mutate({
      data: {
        content,
      },
      params: {
        f: graphPath,
      },
      cellId: cell.id,
    });
  };

  const onSaveChangesDebounced = (content: string | undefined) => {
    clearTimeout(saveChangesTimerRef.current);

    saveChangesTimerRef.current = setTimeout(() => {
      onSaveChanges(content || '');
    }, 500);
  };

  useEffect(() => {
    if (response && editor) {
      editor.setValue(response.data.content);
    }
  }, [editor, response]);

  return (
    <Box minW="300px" minH="100px" h="100%">
      <Editor
        defaultLanguage={isPython ? 'python' : 'typescript'}
        defaultValue={response?.data.content ?? ''}
        theme={isDark ? 'vs-dark' : 'vs-light'}
        options={{
          lineNumbersMinChars: 3,
          showFoldingControls: 'never',
          minimap: {
            enabled: false,
          },
        }}
        onChange={(content) => onSaveChangesDebounced(content)}
        onMount={(mountedEditor) => {
          setEditor(mountedEditor);
        }}
      />
    </Box>
  );
};

export default CodeCell;
