import './canvas.css';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  type DefaultLinkModel,
  type DefaultPortModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { useMemo } from 'react';

import type { GraphModel } from '../../api/schema';
import CodeNodeFactory from './Node/CodeNodeFactory';
import { CodeNodeModel } from './Node/CodeNodeModel';

const CELL_COLORS = {
  input: 'rgb(0,192,255)',
  code: 'rgb(192,0,255)',
};

export interface CanvasProps {
  codeGraph: GraphModel;
}

function Canvas({ codeGraph }: CanvasProps) {
  const engine = useMemo(() => {
    const newEngine = createEngine();
    const model = new DiagramModel();

    newEngine.getNodeFactories().registerFactory(new CodeNodeFactory());

    codeGraph.cells.forEach((cell) => {
      const node = new CodeNodeModel({
        id: cell.id,
        name: cell.id,
        color: CELL_COLORS[cell.cell_type as 'input' | 'code'],
        cell,
        cellState: {
          isLoading: false,
        },
      });

      node.setPosition(cell.position.x, cell.position.y);
      model.addNode(node);
    });

    codeGraph.links.forEach((link) => {
      const fromNode = model.getNode(link.from_cell.id);
      const fromPort = fromNode.getPort(String(link.from_cell.port)) as DefaultPortModel | null;

      const toNode = model.getNode(link.to_cell.id);
      const toPort = toNode.getPort(String(link.to_cell.port));

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
