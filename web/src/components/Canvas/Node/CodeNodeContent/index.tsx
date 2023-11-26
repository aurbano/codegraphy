import type { GraphCell } from '../../../../models';
import type { CellProps } from '../CodeNodeFactory';
import CodeCell from './cells/CodeCell';
import InputCell from './cells/InputCell';

export interface CodeNodeContentProps {
  cell: GraphCell;
  cellProps: CellProps;
}
const CodeNodeContent = ({ cell, cellProps: { onUpdateValue } }: CodeNodeContentProps) => {
  if (cell.cell_type === 'code') {
    return <CodeCell cell={cell} />;
  }

  return <InputCell cell={cell} onUpdateValue={onUpdateValue} />;
};

export default CodeNodeContent;
