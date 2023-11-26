import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type React from 'react';

import QueryContext from './QueryContext';
import theme, { initialColorMode } from './theme';

export interface SetupContextProps {
  children: React.ReactNode;
}

function SetupContext({ children }: SetupContextProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryContext>
        <ColorModeScript initialColorMode={initialColorMode} />
        {children}
      </QueryContext>
    </ChakraProvider>
  );
}

export default SetupContext;
