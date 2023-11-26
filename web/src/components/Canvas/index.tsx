import './canvas.css';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import { useEffect, useMemo } from 'react';

import type { GraphModel } from '../../models';
import CodeNodeFactory from './Node/CodeNodeFactory';
import type { CodeNodeModel } from './Node/CodeNodeModel';
import graphToModel from './util/graphToModel';

export interface CanvasProps {
  codeGraph: GraphModel;
  onUpateGraph: (graph: GraphModel) => void;
  onSelectNode: (nodeModel?: CodeNodeModel) => void;
}

const Canvas = ({ codeGraph, onUpateGraph, onSelectNode }: CanvasProps) => {
  const engine = useMemo(() => {
    const newEngine = createEngine();
    newEngine.getNodeFactories().registerFactory(new CodeNodeFactory({ onUpdateValue: () => {} }));
    newEngine.setModel(graphToModel(codeGraph, onUpateGraph, onSelectNode));

    return newEngine;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engine.setModel(graphToModel(codeGraph, onUpateGraph, onSelectNode));
    engine.zoomToFit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeGraph, engine]);

  return <CanvasWidget className="diagram-container" engine={engine} />;
};

export default Canvas;
