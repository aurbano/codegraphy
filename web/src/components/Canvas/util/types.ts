import type { BaseEventProxy } from '@projectstorm/react-canvas-core';

export type SelectionChangedEvent = BaseEventProxy & {
  isSelected: boolean;
};
