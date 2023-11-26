import { Flex } from '@chakra-ui/react';
import type { DefaultPortModel, DiagramEngine, NodeModel } from '@projectstorm/react-diagrams';

import Port from './Port';

type PortDefinitions = ReturnType<NodeModel['getPorts']>;

export interface PortsProps {
  ports: PortDefinitions;
  type: 'in' | 'out';
  engine: DiagramEngine;
}

function Ports({ ports, engine, type }: PortsProps) {
  return (
    <Flex
      direction="column"
      justifyContent="space-evenly"
      h="100%"
      py={2}
      gap={2}
      {...{
        [type === 'in' ? 'ml' : 'mr']: -3,
      }}
    >
      {Object.keys(ports)
        .filter((port) => {
          const portModel = ports[port] as DefaultPortModel;
          const options = portModel.getOptions();
          const portType = options.in ? 'in' : 'out';

          return type === portType;
        })
        .map((port) => {
          const portModel = ports[port] as DefaultPortModel;
          const options = portModel.getOptions();
          const isIn = portModel.getOptions().in;
          const name = options.label;

          return (
            <Port
              key={port}
              name={name}
              anchor={isIn ? 'left' : 'right'}
              portModel={portModel}
              engine={engine}
            />
          );
        })}
    </Flex>
  );
}

export default Ports;
