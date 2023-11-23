interface CellBase {
  id: string;
  cell_type: 'input' | 'code';
  returns: (string | number)[];
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
  params: string[];
  execution_count: number;
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
