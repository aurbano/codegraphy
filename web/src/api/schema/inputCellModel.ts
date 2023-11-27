/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Codegraphy API
 * OpenAPI spec version: 0.1.0
 */
import type { CellPosition } from './cellPosition';
import type { InputCellModelReturnsItem } from './inputCellModelReturnsItem';
import type { InputCellModelType } from './inputCellModelType';
import type { InputCellModelValue } from './inputCellModelValue';

export interface InputCellModel {
  cell_type: 'input';
  id: string;
  label: string;
  position: CellPosition;
  returns: InputCellModelReturnsItem[];
  type: InputCellModelType;
  value: InputCellModelValue;
}
