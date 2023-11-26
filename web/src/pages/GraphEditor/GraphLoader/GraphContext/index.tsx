import { createContext, type ReactNode, useContext, useMemo } from 'react';

interface GraphContextData {
  graphPath: string;
}

export const GraphContext = createContext<GraphContextData>({
  graphPath: '',
});

export interface GraphContextProps {
  graphPath: string;
  children: ReactNode;
}

const GraphContextProvider = ({ graphPath, children }: GraphContextProps) => {
  const ctx = useMemo(
    () => ({
      graphPath,
    }),
    [graphPath],
  );

  return <GraphContext.Provider value={ctx}>{children}</GraphContext.Provider>;
};

export const useGraphContext = () => {
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const ctx = useContext(GraphContext);
  return ctx;
};

export default GraphContextProvider;
