import { MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { AiFillCode } from 'react-icons/ai';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { LuTextCursorInput } from 'react-icons/lu';

import type { CodeNodeModel } from '../../../../components/Canvas/Node/CodeNodeModel';
import { ContextMenu } from '../../../../components/ContextMenu';
import getKeyboardCommand from '../../../../util/getKeyboardCommand';

export interface GraphContextMenuProps {
  selectedNode: CodeNodeModel | undefined;
  canvasContainerRef: React.RefObject<HTMLDivElement>;
}

const GraphContextMenu = ({ selectedNode, canvasContainerRef }: GraphContextMenuProps) => (
  <ContextMenu
    targetRef={canvasContainerRef}
    renderMenu={() => (
      <MenuList fontSize="sm">
        {selectedNode && (
          <>
            <MenuItem icon={<FaPencilAlt />} command={getKeyboardCommand(['meta', 'O'])}>
              Edit Cell
            </MenuItem>
            <MenuItem icon={<FaTrash />} command={getKeyboardCommand(['del'])}>
              Delete Cell
            </MenuItem>
            <MenuDivider />
          </>
        )}
        <MenuItem icon={<LuTextCursorInput />}>Add Input Cell</MenuItem>
        <MenuItem icon={<AiFillCode />}>Add Code Cell</MenuItem>
      </MenuList>
    )}
  />
);

export default GraphContextMenu;
