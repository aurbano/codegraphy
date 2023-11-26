import { Box, Flex } from '@chakra-ui/react';

import { useReadGraphApiGraphsGet } from './api';
import Canvas from './Canvas';
import Header from './Header';

function App() {
  const {
    isLoading,
    data: response,
    isError,
  } = useReadGraphApiGraphsGet(
    {
      f: 'example_graphs/sample',
    },
    {
      query: {
        queryKey: ['graphs'],
      },
    },
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError || !response) {
    return <>Error!</>;
  }

  const codeGraph = response.data;

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Box flexGrow={1} h="100%" position="relative">
        <Canvas codeGraph={codeGraph} />
      </Box>
    </Flex>
  );
}

export default App;
