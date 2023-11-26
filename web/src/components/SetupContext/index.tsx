import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type React from 'react';

import QueryContext from './QueryContext';
import theme, { initialColorMode } from './theme';

export interface SetupContextProps {
  children: React.ReactNode;
}

const SetupContext = ({ children }: SetupContextProps) => (
    <ChakraProvider resetCSS theme={theme}>
      <QueryContext>
        <ColorModeScript initialColorMode={initialColorMode} />
        {children}
      </QueryContext>
    </ChakraProvider>
  )

export default SetupContext;
