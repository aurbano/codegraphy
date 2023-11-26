import type { GraphModel } from '../models';

const getEmptyGraph = (): GraphModel => ({
  cells: [],
  links: [],
  metadata: {
    graph_version: 1,
    graph_version_minor: 1,
    kernels: [],
  },
});

export default getEmptyGraph;
