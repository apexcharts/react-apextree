import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useImperativeHandle,
  useRef,
} from 'react';
import ApexTree from 'apextree';
import type { ApexTreeProps, ApexTreeRef, GraphInstance } from './types';

/**
 * react wrapper component for ApexTree
 */
export const ApexTreeChart = forwardRef<ApexTreeRef, ApexTreeProps>(
  function ApexTreeChart(props, ref) {
    const { data, options, onNodeClick, className, style } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<ApexTree | null>(null);
    const graphRef = useRef<GraphInstance | null>(null);

    // Latest `data`, read by the build effect (which is not keyed on it).
    const dataRef = useRef(data);
    dataRef.current = data;

    // The dataset the live instance was last drawn with, so a rebuild followed by
    // the data effect does not immediately reconcile the same data twice.
    const renderedDataRef = useRef<ApexTreeProps['data'] | null>(null);

    // keep onNodeClick in a ref so the effect doesn't re-run when the callback changes identity
    const onNodeClickRef = useRef(onNodeClick);
    useEffect(() => {
      onNodeClickRef.current = onNodeClick;
    });

    // merge onNodeClick into options; stable object identity when neither changes
    const mergedOptions = useMemo(() => ({
      ...options,
      ...(onNodeClick !== undefined && {
        onNodeClick: (node: unknown) => onNodeClickRef.current?.(node),
      }),
    }), [options, onNodeClick !== undefined]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Reconcile a new dataset into the live tree, falling back to a full rebuild
     * when the installed core predates `updateData` (apextree < 2.0.0, which the
     * `>=1.9.0` peer range still allows).
     */
    const applyData = useCallback((next: ApexTreeProps['data']) => {
      const graph = graphRef.current;
      if (!graph || !next || renderedDataRef.current === next) {
        return;
      }

      if (typeof graph.updateData === 'function') {
        graph.updateData(next);
      } else if (containerRef.current) {
        treeRef.current?.destroy();
        const tree = new ApexTree(containerRef.current, mergedOptions);
        treeRef.current = tree;
        graphRef.current = tree.render(next) as GraphInstance;
      }

      renderedDataRef.current = next;
    }, [mergedOptions]);

    // expose imperative methods via ref
    useImperativeHandle(ref, () => ({
      changeLayout: (direction) => {
        graphRef.current?.changeLayout(direction);
      },
      collapse: (nodeId) => {
        graphRef.current?.collapse(nodeId);
      },
      expand: (nodeId) => {
        graphRef.current?.expand(nodeId);
      },
      fitScreen: () => {
        graphRef.current?.fitScreen();
      },
      updateData: (next) => {
        applyData(next);
      },
      expandAll: () => {
        graphRef.current?.expandAll();
      },
      collapseAll: () => {
        graphRef.current?.collapseAll();
      },
      expandToDepth: (depth) => {
        graphRef.current?.expandToDepth(depth);
      },
      focus: (nodeId) => {
        graphRef.current?.focus(nodeId);
      },
      clearFocus: () => {
        graphRef.current?.clearFocus();
      },
      setActivePath: (nodeIds) => {
        graphRef.current?.setActivePath(nodeIds);
      },
      clearActivePath: () => {
        graphRef.current?.clearActivePath();
      },
      toggleCard: (nodeId) => {
        graphRef.current?.toggleCard(nodeId);
      },
      zoom: (factor) => {
        graphRef.current?.zoom(factor);
      },
      centerOnNode: (nodeId) => {
        graphRef.current?.centerOnNode(nodeId);
      },
      getGraph: () => graphRef.current,
    }), []); // eslint-disable-line react-hooks/exhaustive-deps

    // Build the instance for a given options identity. Deliberately NOT keyed on
    // `data`: a data change is reconciled below instead of rebuilt, so the read
    // goes through a ref to avoid a stale closure.
    useEffect(() => {
      if (!containerRef.current || !dataRef.current) {
        return;
      }

      const tree = new ApexTree(containerRef.current, mergedOptions);
      treeRef.current = tree;
      graphRef.current = tree.render(dataRef.current) as GraphInstance;
      renderedDataRef.current = dataRef.current;

      return () => {
        treeRef.current?.destroy();
        treeRef.current = null;
        graphRef.current = null;
        renderedDataRef.current = null;
      };
    }, [mergedOptions]);

    // A new `data` prop reconciles into the live tree: surviving nodes spring to
    // their new positions, new ids grow in, departed ones retract, and collapse
    // state / selection / focus / expanded cards all survive. Before this the
    // whole chart was torn down and rebuilt on every data change.
    useEffect(() => {
      applyData(data);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div
        ref={containerRef}
        className={className}
        style={style}
      />
    );
  }
);
