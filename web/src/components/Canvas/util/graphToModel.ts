import {
  type BaseEvent,
  type BaseEventProxy,
  type DefaultLinkModel,
  type DefaultPortModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';

import type { GraphModel } from '../../../models';
import { CodeNodeModel } from '../Node/CodeNodeModel';
import { CELL_COLORS } from '../types';
import modelToGraph from './modelToGraph';

const graphToModel = (
  codeGraph: GraphModel,
  onUpdateGraph: (newGraph: GraphModel) => void,
): DiagramModel => {
  const model = new DiagramModel();

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

  model.registerListener({
    eventDidFire: (event: BaseEvent) => {
      const eventProxy = event as BaseEventProxy;

      if (eventProxy.function === 'nodesUpdated') {
        onUpdateGraph(modelToGraph(codeGraph, model));
      }
    },
  });

  return model;
};

export default graphToModel;
