import { Alert, AlertDescription, AlertIcon, Box, Container, Flex } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { useUpdateGraphApiGraphsPut } from '../../../api';
import Canvas from '../../../components/Canvas';
import type { CodeNodeModel } from '../../../components/Canvas/Node/CodeNodeModel';
import CenterLoader from '../../../components/CenterLoader';
import ErrorBoundary from '../../../components/ErrorBoundary';
import type { GraphModel } from '../../../models';
import useGraphModel from '../../../util/hooks/useGraphModel';
import GraphContextMenu from './GraphContextMenu';
import GraphHeader from './GraphHeader';

export interface GraphLoaderProps {
  isHeaderCollapsed: boolean;
  graphPath: string;
  onOpenGraph: (graphPath: string) => void;
  toggleHeaderCollapsed: () => void;
}

const GraphLoader = ({
  isHeaderCollapsed,
  graphPath,
  onOpenGraph,
  toggleHeaderCollapsed,
}: GraphLoaderProps) => {
  const queryClient = useQueryClient();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [selectedNode, setSelectedNode] = useState<CodeNodeModel>();

  const { isLoading, data: response, isError } = useGraphModel();

  const updateMutation = useUpdateGraphApiGraphsPut({
    mutation: {
      onMutate: (data) => {
        queryClient.setQueryData(['graphs', graphPath], data);
      },
    },
  });

  const onUpdateGraph = (newGraph: GraphModel) => {
    updateMutation.mutate({
      data: newGraph,
      params: {
        f: graphPath,
      },
    });
  };

  if (isLoading) {
    return <CenterLoader label="Loading graph..." />;
  }

  if (isError || !response) {
    return (
      <Container mt={10}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Unable to load graph, please make sure the path is correct.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  const preventEvent = (e: React.MouseEvent | React.UIEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <GraphContextMenu selectedNode={selectedNode} canvasContainerRef={canvasContainerRef} />

      <Flex direction="column" h="100%">
        <GraphHeader
          isHeaderCollapsed={isHeaderCollapsed}
          toggleHeaderCollapsed={toggleHeaderCollapsed}
          isSavingGraph={updateMutation.isPending}
          onOpenGraph={onOpenGraph}
          onUpdateGraph={onUpdateGraph}
        />

        <Box
          key="canvas-container"
          ref={canvasContainerRef}
          style={{ width: '100%', height: '100%' }}
          onScroll={preventEvent}
          onWheel={preventEvent}
        >
          <ErrorBoundary>
            <Canvas key="canvas" onUpateGraph={onUpdateGraph} onSelectNode={setSelectedNode} />
          </ErrorBoundary>
        </Box>
      </Flex>
    </>
  );
};

export default GraphLoader;
