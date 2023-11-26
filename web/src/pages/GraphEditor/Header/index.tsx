import { Box, Container, Flex, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import { FaCloud } from 'react-icons/fa';

import InlineIcon from '../../../components/InlineIcon';
import Logo from '../../../components/Logo';
import useIsDark from '../../../util/hooks/useIsDark';
import { HEADER_MAX_W } from '../constants';
import EditableGraphPath from './EditableGraphPath';
import ServerStatus from './ServerStatus';

export interface HeaderProps {
  graphPath: string;
  onOpenGraph: (graphPath: string) => void;
}

function Header({ graphPath, onOpenGraph }: HeaderProps) {
  const isDark = useIsDark();
  const bg = useColorModeValue('headerBgLight', 'headerBgDark');
  const border = useColorModeValue('headerBorderLight', 'headerBorderDark');

  return (
    <Box
      bg={bg}
      borderBottom="2px solid"
      borderBottomColor={isDark ? '#3c5067' : '#ddd'}
      px={4}
      pt={3}
      pb={2}
      shadow="lg"
    >
      <Container maxW={HEADER_MAX_W}>
        <Flex direction="row" alignItems="center">
          <Flex direction="row" flexGrow={1} gap={4} alignItems="center">
            <Logo fontSize="1.3rem" />

            <EditableGraphPath graphPath={graphPath} onOpenGraph={onOpenGraph} />

            <Text fontSize="sm" color="muted.500" minW="70px">
              <InlineIcon icon={<FaCloud />} mr={2} />
              Saved
            </Text>
          </Flex>

          <Spacer />

          <ServerStatus />
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
