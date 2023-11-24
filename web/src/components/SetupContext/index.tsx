import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type React from 'react';

import theme, { initialColorMode } from './theme';

export interface SetupContextProps {
  children: React.ReactNode;
}

function SetupContext({ children }: SetupContextProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode={initialColorMode} />
      {children}
    </ChakraProvider>
  );
}

export default SetupContext;
