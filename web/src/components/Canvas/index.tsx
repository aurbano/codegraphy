import './canvas.css';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import { useEffect, useMemo } from 'react';

import type { GraphModel } from '../../models';
import CodeNodeFactory from './Node/CodeNodeFactory';
import calculateModel from './util';

export interface CanvasProps {
  codeGraph: GraphModel;
}

const Canvas = ({ codeGraph }: CanvasProps) => {
  const engine = useMemo(() => {
    const newEngine = createEngine();
    newEngine.getNodeFactories().registerFactory(new CodeNodeFactory());
    newEngine.setModel(calculateModel(codeGraph));

    return newEngine;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engine.setModel(calculateModel(codeGraph));
  }, [codeGraph, engine]);

  return <CanvasWidget className="diagram-container" engine={engine} />;
};

export default Canvas;
