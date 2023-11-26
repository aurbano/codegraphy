import { Box, Flex, Spinner } from '@chakra-ui/react';

import InlineIcon from '../InlineIcon';

interface CenterLoaderProps {
  label?: string;
}

const CenterLoader = ({ label = 'Loading...' }: CenterLoaderProps) => (
    <Flex h="100%" direction="column" justifyContent="center">
      <Box textAlign="center" fontSize="lg">
        <InlineIcon top="0.5em" icon={<Spinner size="lg" />} mr={2} /> {label}
      </Box>
    </Flex>
  )

export default CenterLoader;
