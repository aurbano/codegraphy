import type { GraphCell } from '../../../../models';
import CodeCell from './cells/CodeCell';
import InputCell from './cells/InputCell';

export interface CodeNodeContentProps {
  cell: GraphCell;
}

const CodeNodeContent = ({ cell }: CodeNodeContentProps) => {
  if (cell.cell_type === 'code') {
    return <CodeCell cell={cell} />;
  }

  return <InputCell cell={cell} />;
};

export default CodeNodeContent;
