import {
  type DefaultNodeModelOptions,
  DefaultPortModel,
  NodeModel,
} from '@projectstorm/react-diagrams';

import type { GraphCell } from '../../../models';
import type { CellState } from '../types';

export type CodeNodeModelOptions = {
  cell: GraphCell;
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
      const name = index;
      const label = typeof ret === 'string' ? ret : undefined;

      this.addPort(new DefaultPortModel(false, String(name), label));
    });

    if (options.cell.cell_type === 'code') {
      options.cell.params.forEach((param, index) => {
        const name = index;
        const label = typeof param === 'string' ? param : undefined;

        this.addPort(new DefaultPortModel(true, String(name), label));
      });
    }
  }
}
