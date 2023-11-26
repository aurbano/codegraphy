import type { GraphModelCellsItem } from '../../../api/schema';
import CodeCell from './cells/CodeCell';
import InputCell from './cells/InputCell';

export interface CodeNodeContentProps {
  cell: GraphModelCellsItem;
}

function CodeNodeContent({ cell }: CodeNodeContentProps) {
  if (cell.cell_type === 'code') {
    return <CodeCell cell={cell} />;
  }

  return <InputCell cell={cell} />;
}

export default CodeNodeContent;
