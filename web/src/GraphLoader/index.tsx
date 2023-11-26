import { Alert, AlertDescription, AlertIcon, Container } from '@chakra-ui/react';

import { useReadGraphApiGraphsGet } from '../api';
import Canvas from '../components/Canvas';
import CenterLoader from '../components/CenterLoader';

export interface GraphLoaderProps {
  graphPath: string;
}

function GraphLoader({ graphPath }: GraphLoaderProps) {
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

  return <Canvas codeGraph={codeGraph} />;
}

export default GraphLoader;
