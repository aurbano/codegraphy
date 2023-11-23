import {
  type DefaultNodeModelOptions,
  DefaultPortModel,
  NodeModel,
} from '@projectstorm/react-diagrams';

import type { Cell } from '../types';

export type CodeNodeModelOptions = {
  cell: Cell;
} & DefaultNodeModelOptions;

export class CodeNodeModel extends NodeModel {
  nodeOptions: CodeNodeModelOptions;

  constructor(options: CodeNodeModelOptions) {
    super({
      type: 'Code',
      ...options,
    });

    this.nodeOptions = options;

    options.cell.returns.forEach((ret) => {
      this.addPort(
        new DefaultPortModel(false, String(ret), typeof ret === 'string' ? ret : undefined),
      );
    });

    if (options.cell.cell_type === 'code') {
      options.cell.params.forEach((param) => {
        this.addPort(
          new DefaultPortModel(true, String(param), typeof param === 'string' ? param : undefined),
        );
      });
    }
  }
}
