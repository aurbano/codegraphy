import { createContext, type ReactNode, useMemo } from 'react';

export const GraphContext = createContext({
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

export default GraphContextProvider;
