import { Container, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { FaCloud } from 'react-icons/fa';

import AnimatedBox from '../../../components/AnimatedBox';
import InlineIcon from '../../../components/InlineIcon';
import Logo from '../../../components/Logo';
import { HEADER_MAX_W } from '../constants';
import EditableGraphPath from './EditableGraphPath';

export interface HeaderProps {
  graphPath: string;
  isHeaderCollapsed: boolean;
  onOpenGraph: (graphPath: string) => void;
}

const Header = ({ graphPath, isHeaderCollapsed, onOpenGraph }: HeaderProps) => {
  const bg = useColorModeValue('headerBgLight', 'headerBgDark');
  const border = useColorModeValue('headerBorderLight', 'headerBorderDark');

  return (
    <AnimatePresence>
      {!isHeaderCollapsed && (
        <AnimatedBox
          key="header"
          initial={{ height: 0 }}
          animate={{ height: 'auto', transition: { duration: 0.1, ease: 'linear' } }}
          exit={{ height: 0 }}
          bg={bg}
          borderBottom="2px solid"
          borderBottomColor={border}
          px={4}
          pt={3}
          pb={2}
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
            </Flex>
          </Container>
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
}

export default Header;
