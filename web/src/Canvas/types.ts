export type PortName = string | number;

interface CellBase {
  id: string;
  cell_type: 'input' | 'code';
  returns: PortName[];
  position: {
    x: number;
    y: number;
  };
}

export type CellInput = CellBase & {
  cell_type: 'input';
  label: string;
  type: 'number';
  value: number | undefined;
};

export type CellCode = CellBase & {
  cell_type: 'code';
  file_name: string;
  kernel: string;
  params: PortName[];
  execution_count: number;
  execution_time: number | undefined;
  outputs: string[];
};

export type Cell = CellInput | CellCode;

export interface Link {
  from: {
    id: string;
    return: string | number;
  };
  to: {
    id: string;
    param: string;
  };
}

export interface CodeGraph {
  cells: Cell[];
  links: Link[];
}

export interface CellState {
  isLoading: boolean;
}
