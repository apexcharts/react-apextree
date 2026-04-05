import {
  forwardRef,
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
      getGraph: () => graphRef.current,
    }), []);

    // render tree when data or options change; destroy previous instance on cleanup
    useEffect(() => {
      if (!containerRef.current || !data) {
        return;
      }

      const tree = new ApexTree(containerRef.current, mergedOptions);
      treeRef.current = tree;
      graphRef.current = tree.render(data) as GraphInstance;

      return () => {
        treeRef.current?.destroy();
        treeRef.current = null;
        graphRef.current = null;
      };
    }, [data, mergedOptions]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={style}
      />
    );
  }
);
