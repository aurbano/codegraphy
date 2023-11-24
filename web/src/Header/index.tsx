import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { AiFillCode } from 'react-icons/ai';
import { FaChevronDown, FaCloud } from 'react-icons/fa';
import { IoArrowRedo, IoArrowUndo, IoPlayOutline } from 'react-icons/io5';
import { LuTextCursorInput } from 'react-icons/lu';

import InlineIcon from '../components/InlineIcon';
import Logo from '../components/Logo';
import ServerStatus from './ServerStatus';

const headerMaxW = 'container.lg';

function Header() {
  return (
    <Box
      bg="#283e59"
      borderBottom="2px solid"
      borderBottomColor="#3c5067"
      px={4}
      pt={3}
      pb={2}
      shadow="lg"
    >
      <Box mb={2} pb={3} borderBottom="solid 1px" borderBottomColor="rgba(255,255,255,0.1)">
        <Container maxW={headerMaxW}>
          <Flex direction="row" alignItems="center">
            <Flex direction="row" flexGrow={1} gap={4} alignItems="center">
              <Logo fontSize="1.3rem" />

              <Heading size="md" fontWeight="normal">
                Notebook Name
              </Heading>

              <Text fontSize="sm" color="gray.500">
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
                <MenuItem>New</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Save as...</MenuItem>
              </MenuList>
            </Menu>
            <Button leftIcon={<LuTextCursorInput />}>Add Input</Button>
            <Button leftIcon={<AiFillCode />}>Add Code</Button>
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
