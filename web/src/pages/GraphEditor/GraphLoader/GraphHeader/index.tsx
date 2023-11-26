import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillCode } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp, FaFileMedical, FaSave } from 'react-icons/fa';
import { IoArrowRedo, IoArrowUndo, IoPlayOutline } from 'react-icons/io5';

import type { GraphModel, GraphModelCellsItem } from '../../../../api/schema';
import ToggleTheme from '../../../../components/ChangeTheme';
import copyObject from '../../../../util/copyObject';
import getKeyboardCommand from '../../../../util/getKeyboardCommand';
import useIsDark from '../../../../util/hooks/useIsDark';
import { HEADER_MAX_W } from '../../constants';
import OpenGraph from '../../Header/OpenGraph';
import AddInput from './AddInput';

export interface GraphHeaderProps {
  graph: GraphModel;
  isHeaderCollapsed: boolean;
  onOpenGraph: (graphPath: string) => void;
  onUpdateGraph: (newGraph: GraphModel) => void;
  toggleHeaderCollapsed: () => void;
}

const GraphHeader = ({
  graph,
  isHeaderCollapsed,
  onOpenGraph,
  onUpdateGraph,
  toggleHeaderCollapsed,
}: GraphHeaderProps) => {
  const isDark = useIsDark();
  const bg = useColorModeValue('headerBgLight', 'headerBgDark');

  const onAddCell = (newCell: GraphModelCellsItem) => {
    const newGraph = copyObject(graph);
    // TODO: Introduce mutable_ prefix
    // eslint-disable-next-line functional/immutable-data
    newGraph.cells.push(newCell);

    onUpdateGraph(newGraph);
  };

  return (
    <Box
      bg={bg}
      py={2}
      borderBottom="solid 1px"
      borderBottomColor={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
      shadow="md"
    >
      <Container maxW={HEADER_MAX_W}>
        <Flex direction="row">
          <ButtonGroup variant="outline" size="sm">
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                File
              </MenuButton>
              <MenuList>
                <MenuItem
                  isDisabled
                  icon={<FaFileMedical />}
                  command={getKeyboardCommand(['meta', 'N'])}
                >
                  New...
                </MenuItem>

                <MenuDivider />

                <OpenGraph onOpenGraph={onOpenGraph} />

                <MenuDivider />

                <MenuItem isDisabled icon={<FaSave />} command={getKeyboardCommand(['meta', 'S'])}>
                  Save
                </MenuItem>
                <MenuItem
                  isDisabled
                  icon={<FaSave />}
                  command={getKeyboardCommand(['shift', 'meta', 'S'])}
                >
                  Save as...
                </MenuItem>

                <MenuDivider />

                <ToggleTheme />
              </MenuList>
            </Menu>

            <AddInput onAddCell={onAddCell} />

            <Button leftIcon={<AiFillCode />} colorScheme="code" isDisabled>
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

            <Button leftIcon={<IoPlayOutline />} isDisabled>
              Run All
            </Button>

            <IconButton
              aria-label="Collapse"
              icon={isHeaderCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              onClick={toggleHeaderCollapsed}
            />
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}

export default GraphHeader;
