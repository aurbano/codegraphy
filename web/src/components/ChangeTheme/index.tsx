import { MenuItem, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <header>
      <MenuItem icon={isDark ? <FaSun /> : <FaMoon />} onClick={toggleColorMode}>
        Set Theme: {isDark ? 'Light' : 'Dark'}
      </MenuItem>
    </header>
  );
}

export default ToggleTheme;
