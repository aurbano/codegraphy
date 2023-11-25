import {
  type DefaultNodeModelOptions,
  DefaultPortModel,
  NodeModel,
} from '@projectstorm/react-diagrams';

import type { Cell, CellState } from '../types';

export type CodeNodeModelOptions = {
  cell: Cell;
  cellState: CellState;
} & DefaultNodeModelOptions;

export class CodeNodeModel extends NodeModel {
  nodeOptions: CodeNodeModelOptions;

  constructor(options: CodeNodeModelOptions) {
    super({
      type: 'Code',
      ...options,
    });

    this.nodeOptions = options;

    options.cell.returns.forEach((ret, index) => {
      const name = `out-${index}`;
      const label = typeof ret === 'string' ? ret : undefined;

      this.addPort(new DefaultPortModel(false, name, label));
    });

    if (options.cell.cell_type === 'code') {
      options.cell.params.forEach((param, index) => {
        const name = `in-${index}`;
        const label = typeof param === 'string' ? param : undefined;

        this.addPort(new DefaultPortModel(true, name, label));
      });
    }
  }
}
