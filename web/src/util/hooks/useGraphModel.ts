import { useReadGraphApiGraphsGet } from '../../api';
import QueryKeys from '../../models/queryKeys';
import { useGraphContext } from '../../pages/GraphEditor/GraphLoader/GraphContext';
import getEmptyGraph from '../getEmptyGraph';

const useGraphModel = () => {
  const { graphPath } = useGraphContext();

  const query = useReadGraphApiGraphsGet(
    {
      f: graphPath,
    },
    {
      query: {
        queryKey: QueryKeys.Graph(graphPath),
      },
    },
  );

  const graphModel = query.data ? query.data.data : getEmptyGraph();

  return {
    graphModel,
    ...query,
  };
};

export default useGraphModel;
