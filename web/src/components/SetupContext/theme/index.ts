import { extendTheme, theme as baseTheme, type ThemeConfig } from '@chakra-ui/react';

import * as overrides from './overrides';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  // useSystemColorMode: true,
};

export const primary = {
  ...baseTheme.colors.blue,
};

const theme = extendTheme({
  config,

  styles: {
    global: {
      'html, body': {
        background: '#1c2b3f',
      },
    },
  },

  colors: {
    primary,
    focus: baseTheme.colors.cyan,
    secondary: baseTheme.colors.blue,
    positive: baseTheme.colors.green,
    negative: baseTheme.colors.red,
    warning: baseTheme.colors.orange,
    information: baseTheme.colors.blue,
    muted: baseTheme.colors.gray,
  },

  components: {
    ...overrides,
  },
});

export default theme;
