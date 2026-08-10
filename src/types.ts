import type { CSSProperties } from 'react';
import type { TreeOptions, NestedNode, TreeDirection } from 'apextree';

export type { TreeOptions, NestedNode, TreeDirection };

/**
 * the core graph class returned by ApexTree.render(), derived from whatever
 * apextree version the consumer has installed rather than re-declared here.
 *
 * apextree does not export this class by name, so it can only be reached
 * structurally. It is kept internal on purpose: it carries private members, and
 * naming it in an exported declaration triggers TS4094 during declaration emit.
 *
 * Written as `import('apextree').default['render']` rather than
 * `InstanceType<typeof import('apextree').default>['render']` on purpose. A class
 * name in type position already IS its instance type, so this needs no `typeof`.
 * Declaration emitters that rewrite the dynamic import to a bare local alias drop
 * the `typeof` with it, turning the `InstanceType` form into `InstanceType<Alias>`,
 * which is invalid and silently collapses every picked member to `any` under
 * `skipLibCheck`. This form survives that rewrite.
 */
type CoreGraph = ReturnType<import('apextree').default['render']>;

/**
 * public API surface of the graph instance returned by ApexTree.render().
 *
 * `Pick` off the real class rather than a hand-written interface, so every
 * signature stays correct as apextree evolves and new core methods only need
 * their name adding here. Picking (rather than aliasing `CoreGraph`) is what
 * keeps the core's private members out of the emitted declaration: see TS4094.
 */
export type GraphInstance = Pick<
  CoreGraph,
  // layout + collapse/expand
  | 'options'
  | 'changeLayout'
  | 'collapse'
  | 'expand'
  | 'construct'
  | 'render'
  | 'fitScreen'
  // live data updates (apextree >= 2.0.0)
  | 'updateData'
  // batch verbs (apextree >= 2.0.0)
  | 'expandAll'
  | 'collapseAll'
  | 'expandToDepth'
  | 'expandSubtree'
  | 'collapseSubtree'
  // focus / spotlight (apextree >= 2.0.0)
  | 'focus'
  | 'clearFocus'
  | 'getFocusedNodeId'
  // animated active path (apextree >= 2.0.0)
  | 'setActivePath'
  | 'clearActivePath'
  | 'getActivePath'
  // expandable cards (apextree >= 2.0.0)
  | 'expandCard'
  | 'collapseCard'
  | 'toggleCard'
  | 'setExpandedCards'
  | 'getExpandedCards'
  // selection
  | 'setSelection'
  | 'getSelection'
  | 'clearSelection'
  // camera
  | 'zoom'
  | 'centerOnNode'
  // introspection
  | 'getRootNodeId'
  | 'getNodeLabel'
>;

/**
 * imperative methods exposed via ref.
 *
 * These are conveniences for the most common verbs; `getGraph()` returns the
 * full {@link GraphInstance} for everything else.
 */
export interface ApexTreeRef {
  changeLayout: (direction?: TreeDirection) => void;
  collapse: (nodeId: string) => void;
  expand: (nodeId: string) => void;
  fitScreen: () => void;
  /**
   * Diff the tree against a new dataset and spring surviving nodes to their new
   * positions instead of rebuilding. Requires apextree >= 2.0.0; a no-op on
   * older cores.
   */
  updateData: (data: NestedNode) => void;
  expandAll: () => void;
  collapseAll: () => void;
  expandToDepth: (depth: number) => void;
  focus: (nodeId: string) => void;
  clearFocus: () => void;
  setActivePath: (nodeIds: string[]) => void;
  clearActivePath: () => void;
  toggleCard: (nodeId: string) => void;
  zoom: (factor: number) => void;
  centerOnNode: (nodeId: string) => void;
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
