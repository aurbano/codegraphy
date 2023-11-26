import { Box, type BoxProps } from '@chakra-ui/react';

export type InlineIconProps = {
  icon: JSX.Element;
} & BoxProps;

const InlineIcon = ({ icon, ...rest }: InlineIconProps) => (
    <Box display="inline-block" position="relative" top="0.1rem" mr={1} {...rest}>
      {icon}
    </Box>
  )

export default InlineIcon;
