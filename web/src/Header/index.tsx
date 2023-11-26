import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { AiFillCode } from 'react-icons/ai';
import { FaChevronDown, FaCloud, FaFileMedical, FaSave } from 'react-icons/fa';
import { IoArrowRedo, IoArrowUndo, IoPlayOutline } from 'react-icons/io5';
import { LuTextCursorInput } from 'react-icons/lu';

import ToggleTheme from '../components/ChangeTheme';
import InlineIcon from '../components/InlineIcon';
import Logo from '../components/Logo';
import getKeyboardCommand from '../util/getKeyboardCommand';
import useIsDark from '../util/hooks/useIsDark';
import EditableGraphPath from './EditableGraphPath';
import OpenGraph from './OpenGraph';
import ServerStatus from './ServerStatus';

const headerMaxW = 'container.lg';

export interface HeaderProps {
  graphPath: string;
  onOpenGraph: (graphPath: string) => void;
}

function Header({ graphPath, onOpenGraph }: HeaderProps) {
  const isDark = useIsDark();

  return (
    <Box
      bg={isDark ? '#283e59' : '#fafafa'}
      borderBottom="2px solid"
      borderBottomColor={isDark ? '#3c5067' : '#ddd'}
      px={4}
      pt={3}
      pb={2}
      shadow="lg"
    >
      <Box
        mb={2}
        pb={3}
        borderBottom="solid 1px"
        borderBottomColor={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
      >
        <Container maxW={headerMaxW}>
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

      <Container maxW={headerMaxW}>
        <Flex direction="row">
          <ButtonGroup variant="outline" size="sm">
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                File
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaFileMedical />} command={getKeyboardCommand(['meta', 'N'])}>
                  New
                </MenuItem>

                <MenuDivider />

                <OpenGraph onOpenGraph={onOpenGraph} />

                <MenuDivider />

                <MenuItem icon={<FaSave />} command={getKeyboardCommand(['meta', 'S'])}>
                  Save
                </MenuItem>
                <MenuItem icon={<FaSave />} command={getKeyboardCommand(['shift', 'meta', 'S'])}>
                  Save as...
                </MenuItem>

                <MenuDivider />

                <ToggleTheme />
              </MenuList>
            </Menu>

            <Button leftIcon={<LuTextCursorInput />} colorScheme="input">
              Add Input
            </Button>

            <Button leftIcon={<AiFillCode />} colorScheme="code">
              Add Code
            </Button>
          </ButtonGroup>

          <Spacer />

          <ButtonGroup variant="outline" size="sm">
            <Button leftIcon={<IoArrowUndo />} isDisabled>
              Undo
            </Button>
            <Button leftIcon={<IoArrowRedo />} isDisabled>
              Redo
            </Button>
            <Button leftIcon={<IoPlayOutline />}>Run All</Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
