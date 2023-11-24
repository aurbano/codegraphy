import { ChakraProvider } from '@chakra-ui/react';
import type React from 'react';

import theme from './theme';

export interface SetupContextProps {
  children: React.ReactNode;
}

function SetupContext({ children }: SetupContextProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
}

export default SetupContext;
