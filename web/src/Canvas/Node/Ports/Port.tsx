import { Box } from '@chakra-ui/react';
import { type DiagramEngine, type PortModel, PortWidget } from '@projectstorm/react-diagrams';

interface PortProps {
  portModel: PortModel;
  engine: DiagramEngine;
  name: string | undefined;
  anchor: 'right' | 'left';
}

function Port({ portModel, engine, name, anchor }: PortProps) {
  const isConnected = Object.keys(portModel.getLinks()).length > 0;
  const hasName = typeof name === 'string' && name.length > 0;

  return (
    <Box
      position="relative"
      z-index={10}
      fontSize="sm"
      minH="1em"
      bg={isConnected ? 'port.900' : 'muted.900'}
      borderBottom={isConnected ? 'solid 1px' : undefined}
      borderBottomColor="port.600"
      color={!isConnected ? 'negative.400' : undefined}
      rounded="md"
      cursor="pointer"
      shadow="sm"
      py={1}
      px={2}
      {...{
        [anchor === 'left' ? 'pl' : 'pr']: 4,
      }}
    >
      <PortWidget
        port={portModel}
        engine={engine}
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          top: '50%',
          marginTop: '-5px',
          [anchor]: '-5px',
        }}
      >
        <Box bg={isConnected ? 'muted.500' : 'negative.600'} w="100%" h="100%" rounded="full" />
      </PortWidget>

      {hasName ? name : ''}
    </Box>
  );
}

export default Port;
