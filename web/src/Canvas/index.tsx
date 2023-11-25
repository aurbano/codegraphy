import './canvas.css';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  type DefaultLinkModel,
  type DefaultPortModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { useMemo } from 'react';

import CodeNodeFactory from './Node/CodeNodeFactory';
import { CodeNodeModel } from './Node/CodeNodeModel';
import type { CodeGraph } from './types';

const CELL_COLORS = {
  input: 'rgb(0,192,255)',
  code: 'rgb(192,0,255)',
};

export interface CanvasProps {
  codeGraph: CodeGraph;
}

function Canvas({ codeGraph }: CanvasProps) {
  const engine = useMemo(() => {
    const newEngine = createEngine();
    const model = new DiagramModel();

    newEngine.getNodeFactories().registerFactory(new CodeNodeFactory());

    codeGraph.cells.forEach((cell) => {
      const node = new CodeNodeModel({
        id: cell.id,
        name: `${cell.cell_type}: ${cell.id}`,
        color: CELL_COLORS[cell.cell_type],
        cell,
        cellState: {
          isLoading: false,
        },
      });

      node.setPosition(cell.position.x, cell.position.y);
      model.addNode(node);
    });

    codeGraph.links.forEach((link) => {
      const fromNode = model.getNode(link.from.id);
      const fromPort = fromNode.getPort(String(link.from.return)) as DefaultPortModel | null;

      const toNode = model.getNode(link.to.id);
      const toPort = toNode.getPort(link.to.param);

      if (!fromPort || !toPort) {
        // eslint-disable-next-line no-console
        console.error('Invalid link', link);
        return;
      }

      const modelLink = fromPort.link<DefaultLinkModel>(toPort);

      model.addLink(modelLink);
    });

    newEngine.setModel(model);

    return newEngine;
  }, [codeGraph]);

  return <CanvasWidget className="diagram-container" engine={engine} />;
}

export default Canvas;
