import { Box, Flex, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';

import GraphLoader from './GraphLoader';
import GraphContextProvider from './GraphLoader/GraphContext';
import Header from './Header';

const App = () => {
  const [isHeaderCollapsed, { toggle: toggleHeaderCollapsed }] = useBoolean(false);
  const [graphPath, setGraphPath] = useState('example_graphs/sample');

  return (
    <GraphContextProvider graphPath={graphPath}>
      <Flex direction="column" h="100vh">
        <Header isHeaderCollapsed={isHeaderCollapsed} onOpenGraph={setGraphPath} />

        <Box flexGrow={1} h="100%" position="relative">
          <GraphLoader
            graphPath={graphPath}
            isHeaderCollapsed={isHeaderCollapsed}
            toggleHeaderCollapsed={toggleHeaderCollapsed}
            onOpenGraph={setGraphPath}
          />
        </Box>
      </Flex>
    </GraphContextProvider>
  );
};

export default App;
