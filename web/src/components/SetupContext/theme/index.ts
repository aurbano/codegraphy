import { extendTheme, theme as baseTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode, type StyleFunctionProps } from '@chakra-ui/theme-tools';

import * as overrides from './overrides';

export const initialColorMode = 'light';

const config: ThemeConfig = {
  initialColorMode,
  // useSystemColorMode: true,
};

const theme = extendTheme({
  config,

  styles: {
    global: (props: StyleFunctionProps) => ({
      'html, body': {
        background: mode('#fafafa', '#1c2b3f')(props),
      },
    }),
  },

  colors: {
    primary: baseTheme.colors.blue,
    focus: baseTheme.colors.cyan,
    secondary: baseTheme.colors.blue,
    positive: baseTheme.colors.green,
    negative: baseTheme.colors.red,
    warning: baseTheme.colors.orange,
    information: baseTheme.colors.blue,
    muted: baseTheme.colors.gray,
    input: baseTheme.colors.green,
    code: baseTheme.colors.blue,
    port: baseTheme.colors.blue,
  },

  components: {
    ...overrides,
  },
});

export default theme;
