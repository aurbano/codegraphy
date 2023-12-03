const QueryKeys = {
  Graph: (graphPath: string) => ['graphs', graphPath],
  GraphCell: (graphPath: string, cellId: string) => ['graphs', graphPath, 'cells', cellId],
};

export default QueryKeys;
