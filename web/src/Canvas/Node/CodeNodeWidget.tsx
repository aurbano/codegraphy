/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Badge, Box, ButtonGroup, Flex, IconButton } from '@chakra-ui/react';
import type { DiagramEngine } from '@projectstorm/react-diagrams';
import { useState } from 'react';
import { AiFillCode } from 'react-icons/ai';
import { BiCollapseHorizontal, BiExpandHorizontal } from 'react-icons/bi';
import { IoPlayOutline } from 'react-icons/io5';
import { LuTextCursorInput } from 'react-icons/lu';

import CodeNodeContent from './CodeNodeContent';
import type { CodeNodeModel } from './CodeNodeModel';
import Output from './Output';
import Ports from './Ports';

const PORTS_WIDTH_IN = '75px';
const PORTS_WIDTH_OUT = '10px';

export interface NodeProps {
  node: CodeNodeModel;
  engine: DiagramEngine;
}

function CodeNodeWidget({ node, engine }: NodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const ports = node.getPorts();
  const { cell } = node.nodeOptions;

  const isSelected = node.isSelected();
  const isCode = cell.cell_type === 'code';

  const name = isCode ? cell.file_name : cell.label;

  const hasInputs = isCode && cell.params.length > 0;
  const hasOutputs = cell.returns.length > 0;

  const bg = isCode ? 'blue.700' : 'green.600';
  const border = isCode ? 'blue.200' : 'green.200';
  const icon = isCode ? <AiFillCode /> : <LuTextCursorInput />;

  return (
    <>
      <Box
        bg={bg}
        rounded="md"
        shadow="lg"
        border="solid 5px"
        borderColor={isSelected ? border : 'transparent'}
      >
        <Flex
          direction="row"
          cursor="grab"
          pl={2}
          pr={1}
          py={1}
          gap={2}
          borderBottom="solid 1px"
          borderBottomColor="blue.300"
        >
          <Box fontSize="xl" position="relative" top="2px">
            {icon}
          </Box>

          <Box flexGrow={1}>{name}</Box>

          {isCode && (
            <Box>
              {!isCollapsed && (
                <Badge position="relative" top="-2px" mr={2}>
                  {cell.kernel}
                </Badge>
              )}

              <ButtonGroup size="xs" variant="ghost" spacing={1}>
                <IconButton
                  aria-label="Collapse/Expand code"
                  icon={isCollapsed ? <BiExpandHorizontal /> : <BiCollapseHorizontal />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(!isCollapsed);
                  }}
                />
                <IconButton
                  aria-label="Run code"
                  icon={<IoPlayOutline />}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </ButtonGroup>
            </Box>
          )}
        </Flex>

        <Flex direction="row" gap={4}>
          {hasInputs && (
            <Box w={PORTS_WIDTH_IN} flexGrow={1}>
              <Ports engine={engine} ports={ports} type="in" />
            </Box>
          )}

          {!isCollapsed && (
            <Box flexGrow={2}>
              <CodeNodeContent cell={cell} />
            </Box>
          )}

          {hasOutputs && (
            <Box w={PORTS_WIDTH_OUT} flexGrow={1}>
              <Ports engine={engine} ports={ports} type="out" />
            </Box>
          )}
        </Flex>
      </Box>

      {cell.cell_type === 'code' && <Output outputs={cell.outputs} />}
    </>
  );
}

export default CodeNodeWidget;
