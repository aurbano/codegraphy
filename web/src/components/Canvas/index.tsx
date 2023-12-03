import './canvas.css';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import { useEffect, useMemo } from 'react';

import type { GraphModel } from '../../models';
import useGraphModel from '../../util/hooks/useGraphModel';
import CodeNodeFactory from './Node/CodeNodeFactory';
import type { CodeNodeModel } from './Node/CodeNodeModel';
import graphToModel from './util/graphToModel';

export interface CanvasProps {
  onUpateGraph: (graph: GraphModel) => void;
  onSelectNode: (nodeModel?: CodeNodeModel) => void;
}

const Canvas = ({ onUpateGraph, onSelectNode }: CanvasProps) => {
  const { graphModel } = useGraphModel();

  const engine = useMemo(() => {
    const newEngine = createEngine();
    newEngine.getNodeFactories().registerFactory(new CodeNodeFactory({ onUpdateValue: () => {} }));
    newEngine.setModel(graphToModel(graphModel, onUpateGraph, onSelectNode));

    return newEngine;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engine.setModel(graphToModel(graphModel, onUpateGraph, onSelectNode));
    engine.zoomToFit();
    engine.repaintCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphModel, engine]);

  return <CanvasWidget className="diagram-container" engine={engine} />;
};

export default Canvas;
