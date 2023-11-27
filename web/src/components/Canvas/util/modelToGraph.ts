import type { DiagramModel } from '@projectstorm/react-diagrams';

import type { GraphModel } from '../../../models';
import copyObject from '../../../util/copyObject';
import type { CodeNodeModel } from '../Node/CodeNodeModel';

const modelToGraph = (graph: GraphModel, model: DiagramModel): GraphModel => {
  const mutable_graph = copyObject(graph);

  mutable_graph.cells = [];
  mutable_graph.links = [];

  model.getNodes().forEach((node) => {
    const nodeModel = node as CodeNodeModel;
    const { cell } = nodeModel.nodeOptions;

    mutable_graph.cells.push(cell);
  });

  model.getLinks().forEach((link) => {
    const fromPort = link.getSourcePort();
    const toPort = link.getTargetPort();

    const fromNode = fromPort.getNode() as CodeNodeModel;
    const toNode = toPort.getNode() as CodeNodeModel;

    const fromCell = fromNode.nodeOptions.cell;
    const toCell = toNode.nodeOptions.cell;

    mutable_graph.links.push({
      from_cell: {
        id: fromCell.id,
        port: fromPort.getName(),
      },
      to_cell: {
        id: toCell.id,
        port: toPort.getName(),
      },
      value: null,
    });
  });

  return mutable_graph;
};

export default modelToGraph;
