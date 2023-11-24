import { Box, Flex } from '@chakra-ui/react';

import Canvas from './Canvas';
import { sampleCodeGraph } from './Canvas/sample';
import Header from './Header';

function App() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Box flexGrow={1} h="100%" position="relative">
        <Canvas codeGraph={sampleCodeGraph} />
      </Box>
    </Flex>
  );
}

export default App;
