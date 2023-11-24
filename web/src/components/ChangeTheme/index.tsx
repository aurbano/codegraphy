import { MenuItem, useColorMode } from '@chakra-ui/react';

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <MenuItem onClick={toggleColorMode}>
        Set Theme: {colorMode === 'light' ? 'Dark' : 'Light'}
      </MenuItem>
    </header>
  );
}

export default ToggleTheme;
