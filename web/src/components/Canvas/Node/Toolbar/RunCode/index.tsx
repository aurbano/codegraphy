import { IconButton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { IoPlayOutline } from 'react-icons/io5';

import { useRunCellApiCellsCellIdRunPatch } from '../../../../../api';
import QueryKeys from '../../../../../models/queryKeys';
import { useGraphContext } from '../../../../../pages/GraphEditor/GraphLoader/GraphContext';

export interface RunCodeProps {
  cellId: string;
}

const RunCode = ({ cellId }: RunCodeProps) => {
  const { graphPath } = useGraphContext();
  const queryClient = useQueryClient();

  const runCellMutation = useRunCellApiCellsCellIdRunPatch({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(QueryKeys.Graph(graphPath), data);
      },
    },
  });

  const onRunCell = () =>
    runCellMutation.mutate({
      cellId,
      params: {
        f: graphPath,
      },
    });

  return (
    <IconButton
      aria-label="Run code"
      icon={<IoPlayOutline />}
      onClick={(e) => {
        e.stopPropagation();
        onRunCell();
      }}
    />
  );
};

export default RunCode;
