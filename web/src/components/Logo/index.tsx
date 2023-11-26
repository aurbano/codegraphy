import { Box, type BoxProps, HStack, StackDivider, Text } from '@chakra-ui/react';
import { PiGraphFill } from 'react-icons/pi';

import useIsDark from '../../util/hooks/useIsDark';
import InlineIcon from '../InlineIcon';

export type LogoProps = BoxProps;

const borderColor = 'rgba(255,255,255,0.1)';
const dividerColor = 'rgba(255,255,255,0.05)';

const Logo = ({ ...rest }: LogoProps) => {
  const isDark = useIsDark();

  return (
    <Box
      border="solid 1px"
      borderColor={borderColor}
      rounded="md"
      shadow="md"
      fontWeight="bold"
      color={isDark ? 'primary.200' : 'primary.500'}
      {...rest}
    >
      <HStack gap={2} divider={<StackDivider borderColor={dividerColor} />}>
        <InlineIcon fontSize="1.5em" icon={<PiGraphFill />} mr={0} pl={4} py={2} />
        <Text pr={4} py={2}>
          Codegraphy
        </Text>
      </HStack>
    </Box>
  );
}

export default Logo;
