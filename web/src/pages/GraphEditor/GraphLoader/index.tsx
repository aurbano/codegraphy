import { Alert, AlertDescription, AlertIcon, Container } from '@chakra-ui/react';

import { useReadGraphApiGraphsGet } from '../../../api';
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
        onOpenGraph={onOpenGraph}
        onUpdateGraph={() => {}}
      />
      <Canvas codeGraph={codeGraph} />
    </>
  );
}

export default GraphLoader;
