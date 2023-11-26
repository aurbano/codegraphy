import type { GraphModel } from '../api/schema';

export const sampleCodeGraph: GraphModel = {
  metadata: {
    kernels: [
      {
        display_name: 'safebeat-ml-wN8LJ0A5-py3.9',
        language: 'python',
        name: 'python3',
      },
    ],
    graph_version: 1,
    graph_version_minor: 0,
  },
  cells: [
    {
      id: 'num1',
      cell_type: 'input',
      label: 'Number 1',
      type: 'number',
      value: 10,
      returns: [0],
      position: {
        x: 200,
        y: 100,
      },
    },
    {
      id: 'num2',
      cell_type: 'input',
      label: 'Number 2',
      type: 'number',
      value: 2,
      returns: [0],
      position: {
        x: 200,
        y: 300,
      },
    },
    {
      id: 'add',
      file_name: 'add.py',
      cell_type: 'code',
      kernel: 'python3.9',
      params: ['num1', 'num2'],
      returns: [0],
      execution_count: 1,
      execution_time: 0.0,
      outputs: ['12'],
      position: {
        x: 800,
        y: 100,
      },
    },
    {
      id: 'random',
      file_name: 'random.ts',
      cell_type: 'code',
      kernel: 'typescript4.2',
      params: [],
      returns: [0],
      execution_count: 0,
      execution_time: null,
      outputs: [],
      position: {
        x: 200,
        y: 500,
      },
    },
  ],
  links: [
    {
      from_cell: {
        id: 'num1',
        port: 'out-0',
      },
      to_cell: {
        id: 'add',
        port: 'in-0',
      },
    },
    {
      from_cell: {
        id: 'num2',
        port: 'out-0',
      },
      to_cell: {
        id: 'add',
        port: 'in-1',
      },
    },
  ],
};
