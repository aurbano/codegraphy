// From https://github.com/projectstorm/react-diagrams/issues/164#issuecomment-367683177
const GRAPH_EVENTS = {
  diagram: {
    nodesUpdated: 'nodesUpdated',
    linksUpdated: 'linksUpdated',
    offsetUpdated: 'offsetUpdated',
    zoomUpdated: 'zoomUpdated',
    gridUpdated: 'gridUpdated',
    selectionChanged: 'selectionChanged',
    entityRemoved: 'entityRemoved',
  },
  link: {
    sourcePortChanged: 'sourcePortChanged',
    targetPortChanged: 'targetPortChanged',
    selectionChanged: 'selectionChanged',
    entityRemoved: 'entityRemoved',
  },
  node: {
    selectionChanged: 'selectionChanged',
    entityRemoved: 'entityRemoved',
  },
};

export default GRAPH_EVENTS;
