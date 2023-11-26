import {
  Alert,
  AlertDescription,
  AlertIcon,
  Container,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { AiFillCode } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { LuTextCursorInput } from 'react-icons/lu';

import { useReadGraphApiGraphsGet, useUpdateGraphApiGraphsPut } from '../../../api';
import Canvas from '../../../components/Canvas';
import CenterLoader from '../../../components/CenterLoader';
import { ContextMenu } from '../../../components/ContextMenu';
import type { GraphModel } from '../../../models';
import GraphHeader from './GraphHeader';

export interface GraphLoaderProps {
  isHeaderCollapsed: boolean;
  graphPath: string;
  onOpenGraph: (graphPath: string) => void;
  toggleHeaderCollapsed: () => void;
}

const GraphLoader = ({
  isHeaderCollapsed,
  graphPath,
  onOpenGraph,
  toggleHeaderCollapsed,
}: GraphLoaderProps) => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: response,
    isError,
  } = useReadGraphApiGraphsGet(
    {
      f: graphPath,
    },
    {
      query: {
        queryKey: ['graphs', graphPath],
      },
    },
  );

  const updateMutation = useUpdateGraphApiGraphsPut({
    mutation: {
      onMutate: (data) => {
        queryClient.setQueryData(['graphs', graphPath], data);
      },
    },
  });

  const onUpdateGraph = (newGraph: GraphModel) => {
    updateMutation.mutate({
      data: newGraph,
      params: {
        f: graphPath,
      },
    });
  };

  if (isLoading) {
    return <CenterLoader label="Loading graph..." />;
  }

  if (isError || !response) {
    return (
      <Container mt={10}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Unable to load graph, please make sure the path is correct.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  const codeGraph = response.data;

  return (
    <>
      <GraphHeader
        graph={codeGraph}
        isHeaderCollapsed={isHeaderCollapsed}
        toggleHeaderCollapsed={toggleHeaderCollapsed}
        isAddingCell={updateMutation.isPending}
        onOpenGraph={onOpenGraph}
        onUpdateGraph={onUpdateGraph}
      />

      <ContextMenu<HTMLDivElement>
        renderMenu={() => (
          <MenuList fontSize="sm">
            <MenuItem icon={<LuTextCursorInput />}>Add Input Cell</MenuItem>
            <MenuItem icon={<AiFillCode />}>Add Code Cell</MenuItem>
            <MenuDivider />
            <MenuItem icon={<FaTrash />}>Delete Cell</MenuItem>
          </MenuList>
        )}
      >
        {(ref) => (
          <div ref={ref} style={{ width: '100%', height: '100%' }}>
            <Canvas codeGraph={codeGraph} onUpateGraph={onUpdateGraph} />
          </div>
        )}
      </ContextMenu>
    </>
  );
};

export default GraphLoader;
