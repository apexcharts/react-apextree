import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import ApexTree from 'apextree';
import type { ApexTreeProps, ApexTreeRef, GraphInstance } from './types';
import { buildOptions } from './utils';

/**
 * react wrapper component for ApexTree
 */
export const ApexTreeChart = forwardRef<ApexTreeRef, ApexTreeProps>(
  function ApexTreeChart(props, ref) {
    const { data, className, style } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<GraphInstance | null>(null);

    // memoize options to prevent unnecessary re-renders
    const options = useMemo(() => buildOptions(props), [
      props.width,
      props.height,
      props.direction,
      props.contentKey,
      props.siblingSpacing,
      props.childrenSpacing,
      props.containerClassName,
      props.canvasStyle,
      props.nodeWidth,
      props.nodeHeight,
      props.nodeTemplate,
      props.nodeStyle,
      props.nodeClassName,
      props.nodeBGColor,
      props.nodeBGColorHover,
      props.borderWidth,
      props.borderStyle,
      props.borderRadius,
      props.borderColor,
      props.borderColorHover,
      props.edgeWidth,
      props.edgeColor,
      props.edgeColorHover,
      props.fontSize,
      props.fontFamily,
      props.fontWeight,
      props.fontColor,
      props.enableTooltip,
      props.tooltipId,
      props.tooltipTemplate,
      props.tooltipMaxWidth,
      props.tooltipMinWidth,
      props.tooltipBorderColor,
      props.tooltipBGColor,
      props.tooltipFontColor,
      props.tooltipFontSize,
      props.tooltipPadding,
      props.tooltipOffset,
      props.highlightOnHover,
      props.enableToolbar,
      props.enableExpandCollapse,
      props.expandCollapseButtonBGColor,
      props.expandCollapseButtonBorderColor,
      props.groupLeafNodes,
      props.groupLeafNodesSpacing,
      props.onNodeClick,
    ]);

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

    // render tree when data or options change
    useEffect(() => {
      if (!containerRef.current || !data) {
        return;
      }

      // clear previous content
      containerRef.current.innerHTML = '';

      // create new tree instance and render
      const tree = new ApexTree(containerRef.current, options);
      graphRef.current = tree.render(data as any) as GraphInstance;
    }, [data, options]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={style}
      />
    );
  }
);