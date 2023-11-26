import './canvas.css';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import { useEffect, useMemo } from 'react';

import type { GraphModel } from '../../models';
import CodeNodeFactory from './Node/CodeNodeFactory';
import graphToModel from './util/graphToModel';

export interface CanvasProps {
  codeGraph: GraphModel;
  onUpateGraph: (graph: GraphModel) => void;
}

const Canvas = ({ codeGraph, onUpateGraph }: CanvasProps) => {
  const engine = useMemo(() => {
    const newEngine = createEngine();
    newEngine.getNodeFactories().registerFactory(new CodeNodeFactory());
    newEngine.setModel(graphToModel(codeGraph, onUpateGraph));

    return newEngine;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engine.setModel(graphToModel(codeGraph, onUpateGraph));
  }, [codeGraph, engine, onUpateGraph]);

  return <CanvasWidget className="diagram-container" engine={engine} />;
};

export default Canvas;
