import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import type {
  DiagramEngine,
  GenerateModelEvent,
  GenerateWidgetEvent,
} from '@projectstorm/react-diagrams';

import { CodeNodeModel, type CodeNodeModelOptions } from './CodeNodeModel';
import CodeNodeWidget from './CodeNodeWidget';

export interface CellProps {
  onUpdateValue: (value: string | number) => void;
}

class CodeNodeFactory extends AbstractReactFactory<CodeNodeModel, DiagramEngine> {
  private readonly cellProps: CellProps;

  constructor(cellProps: CellProps) {
    super('Code');

    this.cellProps = cellProps;
  }

  generateReactWidget(event: GenerateWidgetEvent<CodeNodeModel>): JSX.Element {
    return <CodeNodeWidget engine={this.engine} node={event.model} cellProps={this.cellProps} />;
  }

  generateModel(event: GenerateModelEvent) {
    return new CodeNodeModel(event.initialConfig as CodeNodeModelOptions);
  }
}

export default CodeNodeFactory;
