import { Alert, AlertDescription, AlertIcon, Container } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useReadGraphApiGraphsGet, useUpdateGraphApiGraphsPut } from '../../../api';
import Canvas from '../../../components/Canvas';
import CenterLoader from '../../../components/CenterLoader';
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
      onSuccess: (data) => {
        queryClient.setQueryData(['graphs', graphPath], data);
      },
    },
  });

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
        onUpdateGraph={(newGraph) =>
          updateMutation.mutate({
            data: newGraph,
            params: {
              f: graphPath,
            },
          })
        }
      />

      <Canvas codeGraph={codeGraph} />
    </>
  );
};

export default GraphLoader;
