import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import type {
  DiagramEngine,
  GenerateModelEvent,
  GenerateWidgetEvent,
} from '@projectstorm/react-diagrams';

import { CodeNodeModel, type CodeNodeModelOptions } from './CodeNodeModel';
import CodeNodeWidget from './CodeNodeWidget';

class CodeNodeFactory extends AbstractReactFactory<CodeNodeModel, DiagramEngine> {
  constructor() {
    super('Code');
  }

  generateReactWidget(event: GenerateWidgetEvent<CodeNodeModel>): JSX.Element {
    return <CodeNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: GenerateModelEvent) {
    return new CodeNodeModel(event.initialConfig as CodeNodeModelOptions);
  }
}

export default CodeNodeFactory;
