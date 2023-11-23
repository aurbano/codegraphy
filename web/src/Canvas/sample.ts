import type { CodeGraph } from './types';

export const sampleCodeGraph: CodeGraph = {
  // "metadata": {
  //   "kernels": {
  //     "python3.9": {
  //       "display_name": "safebeat-ml-wN8LJ0A5-py3.9",
  //       "language": "python",
  //       "name": "python3"
  //     }
  //   }
  // },
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
      execution_time: undefined,
      outputs: [],
      position: {
        x: 200,
        y: 500,
      },
    },
  ],
  links: [
    {
      from: {
        id: 'num1',
        return: 0,
      },
      to: {
        id: 'add',
        param: 'num1',
      },
    },
    {
      from: {
        id: 'num2',
        return: 0,
      },
      to: {
        id: 'add',
        param: 'num2',
      },
    },
  ],
};
