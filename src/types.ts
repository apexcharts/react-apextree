import type { CSSProperties } from 'react';
import type { TreeOptions, NestedNode, TreeDirection } from 'apextree';

export type { TreeOptions, NestedNode, TreeDirection };

/**
 * public API surface of the graph instance returned by ApexTree.render().
 * Defined as a structural interface to avoid exposing private class members
 * from the core Graph class in wrapper public types (prevents TS4094).
 */
export interface GraphInstance {
  options: TreeOptions;
  changeLayout(direction?: TreeDirection): void;
  collapse(nodeId: string): void;
  construct(data: NestedNode): void;
  expand(nodeId: string): void;
  fitScreen(): void;
  render(options?: { keepOldPosition?: boolean; mode?: 'initial' | 'expand' | 'collapse' | 'data-update' }): void;
}

/**
 * imperative methods exposed via ref
 */
export interface ApexTreeRef {
  changeLayout: (direction?: TreeDirection) => void;
  collapse: (nodeId: string) => void;
  expand: (nodeId: string) => void;
  fitScreen: () => void;
  getGraph: () => GraphInstance | null;
}

/**
 * props for the ApexTree React component
 */
export interface ApexTreeProps<T = undefined> {
  /** Tree data structure */
  data: NestedNode<T>;
  /**
   * Configuration options — imported from core apextree, zero local re-definition.
   * onNodeClick is omitted here; use the top-level onNodeClick prop instead.
   */
  options?: Omit<Partial<TreeOptions>, 'onNodeClick'>;
  /** Callback fired when a node is clicked */
  onNodeClick?: (node: unknown) => void;
  /** CSS class name for the container element */
  className?: string;
  /** Inline styles for the container element */
  style?: CSSProperties;
}
