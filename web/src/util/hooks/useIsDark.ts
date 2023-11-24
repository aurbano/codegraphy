import { useColorMode } from '@chakra-ui/react';

const useIsDark = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark';
};

export default useIsDark;
