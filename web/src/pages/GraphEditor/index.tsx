import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import GraphLoader from './GraphLoader';
import Header from './Header';

function App() {
  const [graphPath, setGraphPath] = useState('example_graphs/sample');

  return (
    <Flex direction="column" h="100vh">
      <Header graphPath={graphPath} onOpenGraph={setGraphPath} />

      <Box flexGrow={1} h="100%" position="relative">
        <GraphLoader graphPath={graphPath} onOpenGraph={setGraphPath} />
      </Box>
    </Flex>
  );
}

export default App;
