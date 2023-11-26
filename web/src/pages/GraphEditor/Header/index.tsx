import { Box, Container, DarkMode, Flex, IconButton, Link, Spacer } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { FaCloud, FaGithub } from 'react-icons/fa';

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

const Header = ({ graphPath, isHeaderCollapsed, onOpenGraph }: HeaderProps) => (
  <DarkMode>
    <AnimatePresence>
      {!isHeaderCollapsed && (
        <AnimatedBox
          key="header"
          initial={{ height: 0 }}
          animate={{ height: 'auto', transition: { duration: 0.1, ease: 'linear' } }}
          exit={{ height: 0 }}
          bg="headerBgDark"
          borderBottom="2px solid"
          borderBottomColor="headerBorderDark"
          px={4}
          pt={3}
          pb={2}
        >
          <Container maxW={HEADER_MAX_W}>
            <Flex direction="row" alignItems="center">
              <Flex direction="row" flexGrow={1} gap={4} alignItems="center">
                <Logo fontSize="1.3rem" />

                <EditableGraphPath graphPath={graphPath} onOpenGraph={onOpenGraph} />

                <Box fontSize="sm" color="muted.500" minW="70px">
                  <InlineIcon icon={<FaCloud />} mr={2} />
                  Saved
                </Box>

                <Spacer />

                <IconButton
                  aria-label="Github"
                  title="Github"
                  icon={<FaGithub />}
                  size="sm"
                  fontSize="xl"
                  rounded="full"
                  variant="ghost"
                  as={Link}
                  href="http://github.com/aurbano/codegraphy"
                  target="_blank"
                />
              </Flex>
            </Flex>
          </Container>
        </AnimatedBox>
      )}
    </AnimatePresence>
  </DarkMode>
);

export default Header;
