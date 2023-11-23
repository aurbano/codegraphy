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
} from '@chakra-ui/react';
import { AiFillCode } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { IoPlayOutline } from 'react-icons/io5';
import { LuTextCursorInput } from 'react-icons/lu';
import { PiGraphFill } from 'react-icons/pi';

import InlineIcon from '../components/InlineIcon';

function Header() {
  return (
    <Box bg="#283e59" borderBottom="2px solid" borderBottomColor="#3c5067" px={4} py={3}>
      <Container maxW="container.lg">
        <Flex direction="column" gap={4}>
          <Heading size="md">
            <InlineIcon mr={2} icon={<PiGraphFill />} />
            Codegraphy
          </Heading>

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
              <Button leftIcon={<IoPlayOutline />}>Run All</Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
