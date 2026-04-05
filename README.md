# react-apextree

React wrapper for [ApexTree](https://github.com/apexcharts/apextree) - a JavaScript library for creating organizational and hierarchical charts.

<img width="811" alt="ApexTree Example" src="https://github.com/apexcharts/tree/assets/17950663/e09212ec-6322-4c68-ac12-9afc524d2abd">

## Installation

```bash
npm install react-apextree apextree
```

> **Note:** `apextree` is a peer dependency and must be installed alongside `react-apextree`.

## Basic Usage

```tsx
import { ApexTreeChart } from "react-apextree";

const data = {
  id: "1",
  name: "CEO",
  children: [
    {
      id: "2",
      name: "CTO",
      children: [
        { id: "3", name: "Dev Lead" },
        { id: "4", name: "QA Lead" },
      ],
    },
    {
      id: "5",
      name: "CFO",
    },
  ],
};

function App() {
  return (
    <ApexTreeChart
      data={data}
      options={{
        width: 800,
        height: 600,
        direction: "top",
        nodeWidth: 120,
        nodeHeight: 80,
      }}
    />
  );
}
```

## Using Imperative Methods

Access methods like `changeLayout`, `collapse`, `expand`, and `fitScreen` via ref:

```tsx
import { useRef } from "react";
import { ApexTreeChart, ApexTreeRef } from "react-apextree";

function App() {
  const treeRef = useRef<ApexTreeRef>(null);

  return (
    <div>
      <button onClick={() => treeRef.current?.changeLayout("left")}>Change Layout</button>
      <button onClick={() => treeRef.current?.fitScreen()}>Fit Screen</button>
      <button onClick={() => treeRef.current?.collapse("2")}>Collapse node 2</button>
      <button onClick={() => treeRef.current?.expand("2")}>Expand node 2</button>

      <ApexTreeChart
        ref={treeRef}
        data={data}
        options={{ width: 800, height: 600 }}
      />
    </div>
  );
}
```

## Custom Node Templates

```tsx
<ApexTreeChart
  data={data}
  options={{
    width: 800,
    height: 600,
    contentKey: "data",
    nodeWidth: 150,
    nodeHeight: 100,
    nodeTemplate: (content) => `
      <div style="display: flex; flex-direction: column; align-items: center; height: 100%;">
        <img
          src="${content.imageURL}"
          style="width: 50px; height: 50px; border-radius: 50%;"
        />
        <div style="font-weight: bold;">${content.name}</div>
      </div>
    `,
  }}
/>
```

## Props

| Prop          | Type                                    | Default      | Description                           |
| ------------- | --------------------------------------- | ------------ | ------------------------------------- |
| `data`        | `NestedNode`                            | **required** | Tree data structure                   |
| `options`     | `Omit<Partial<TreeOptions>, 'onNodeClick'>` | -        | Tree configuration (see below)        |
| `onNodeClick` | `(node: unknown) => void`               | -            | Callback fired when a node is clicked |
| `className`   | `string`                                | -            | CSS class for the container           |
| `style`       | `CSSProperties`                         | -            | Inline styles for the container       |

### TreeOptions

All tree configuration is passed through the `options` prop:

| Option                           | Type                           | Default     | Description                         |
| -------------------------------- | ------------------------------ | ----------- | ----------------------------------- |
| `width`                          | `number \| string`             | `400`       | Width of the container              |
| `height`                         | `number \| string`             | `400`       | Height of the container             |
| `direction`                      | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direction of tree growth       |
| `contentKey`                     | `string`                       | `'name'`    | Key for node content                |
| `siblingSpacing`                 | `number`                       | `50`        | Spacing between siblings            |
| `childrenSpacing`                | `number`                       | `50`        | Spacing between parent and children |
| `nodeWidth`                      | `number`                       | `50`        | Width of nodes                      |
| `nodeHeight`                     | `number`                       | `30`        | Height of nodes                     |
| `nodeTemplate`                   | `(content: string) => string`  | -           | Custom HTML template for nodes      |
| `nodeStyle`                      | `string`                       | -           | CSS styles for nodes                |
| `nodeBGColor`                    | `string`                       | `'#FFFFFF'` | Node background color               |
| `nodeBGColorHover`               | `string`                       | `'#FFFFFF'` | Node background color on hover      |
| `borderWidth`                    | `number`                       | `1`         | Node border width                   |
| `borderStyle`                    | `string`                       | `'solid'`   | Node border style                   |
| `borderRadius`                   | `string`                       | `'5px'`     | Node border radius                  |
| `borderColor`                    | `string`                       | `'#BCBCBC'` | Node border color                   |
| `borderColorHover`               | `string`                       | `'#5C6BC0'` | Node border color on hover          |
| `edgeWidth`                      | `number`                       | `1`         | Edge line width                     |
| `edgeColor`                      | `string`                       | `'#BCBCBC'` | Edge line color                     |
| `edgeColorHover`                 | `string`                       | `'#5C6BC0'` | Edge line color on hover            |
| `fontSize`                       | `string`                       | `'14px'`    | Font size                           |
| `fontFamily`                     | `string`                       | -           | Font family                         |
| `fontWeight`                     | `string`                       | `'400'`     | Font weight                         |
| `fontColor`                      | `string`                       | `'#000000'` | Font color                          |
| `highlightOnHover`               | `boolean`                      | `true`      | Enable highlight on hover           |
| `enableToolbar`                  | `boolean`                      | `false`     | Show toolbar                        |
| `enableExpandCollapse`           | `boolean`                      | `false`     | Enable expand/collapse buttons      |
| `expandCollapseButtonBGColor`    | `string`                       | -           | Expand/collapse button background   |
| `expandCollapseButtonBorderColor`| `string`                       | -           | Expand/collapse button border       |
| `enableTooltip`                  | `boolean`                      | `false`     | Enable tooltips                     |
| `tooltipTemplate`                | `(content: string) => string`  | -           | Custom tooltip template             |
| `tooltipMaxWidth`                | `number`                       | -           | Tooltip max width                   |
| `tooltipMinWidth`                | `number`                       | -           | Tooltip min width                   |
| `tooltipBorderColor`             | `string`                       | -           | Tooltip border color                |
| `tooltipBGColor`                 | `string`                       | -           | Tooltip background color            |
| `tooltipFontColor`               | `string`                       | -           | Tooltip font color                  |
| `tooltipFontSize`                | `string`                       | -           | Tooltip font size                   |
| `tooltipPadding`                 | `number`                       | -           | Tooltip padding                     |
| `tooltipOffset`                  | `number`                       | -           | Tooltip offset                      |
| `groupLeafNodes`                 | `boolean`                      | `false`     | Stack leaf nodes                    |
| `groupLeafNodesSpacing`          | `number`                       | -           | Spacing when leaf nodes are grouped |
| `canvasStyle`                    | `string`                       | -           | CSS styles for the canvas           |

## Ref Methods

| Method                     | Description                       |
| -------------------------- | --------------------------------- |
| `changeLayout(direction?)` | Change tree direction             |
| `collapse(nodeId)`         | Collapse a node                   |
| `expand(nodeId)`           | Expand a node                     |
| `fitScreen()`              | Fit tree to screen                |
| `getGraph()`               | Get the underlying graph instance |

## Data Structure

```ts
interface NestedNode<T = undefined> {
  id: string;                  // unique identifier
  name: string;                // display label (or use contentKey to point at a different field)
  data: T;                     // custom data payload, available in nodeTemplate / onNodeClick
  children: NestedNode<T>[];   // child nodes; pass [] for leaf nodes
  options?: Partial<TreeOptions>; // per-node visual overrides (font, border, tooltip)
}
```

## TypeScript Support

Full TypeScript support with exported types:

```ts
import type {
  ApexTreeProps,
  ApexTreeRef,
  NestedNode,
  TreeOptions,
  GraphInstance,
} from "react-apextree";
```

## Migrating from v1

**v2 is a breaking change.** All tree configuration options that were previously individual props are now grouped under a single `options` prop.

### Before (v1)

```tsx
<ApexTreeChart
  data={data}
  width={800}
  height={600}
  direction="top"
  nodeWidth={200}
  nodeHeight={80}
  edgeColor="#ccc"
  fontSize="14px"
  enableExpandCollapse
  onNodeClick={(node) => console.log(node)}
/>
```

### After (v2)

```tsx
<ApexTreeChart
  data={data}
  onNodeClick={(node) => console.log(node)}
  options={{
    width: 800,
    height: 600,
    direction: "top",
    nodeWidth: 200,
    nodeHeight: 80,
    edgeColor: "#ccc",
    fontSize: "14px",
    enableExpandCollapse: true,
  }}
/>
```

The `className` and `style` props remain at the top level (they style the container element, not the tree).

### Updated type imports

```diff
- import type { NodeData, NodeOptions, TreeDirection } from "react-apextree";
+ import type { NestedNode, TreeOptions } from "react-apextree";
```

## License

React-Apextree uses the same dual-license model as ApexCharts. See [LICENSE](./LICENSE) for details.

- **Free** for individuals, non-profits, and small businesses (< $2M revenue)
- **Commercial license** required for larger organizations

## Links

- [ApexTree Documentation](https://github.com/apexcharts/apextree)
- [ApexCharts](https://apexcharts.com)
- [License Information](https://apexcharts.com/license)

## Development

### Running the Demo

The package includes a demo app showcasing various features:

```bash
# clone the repo
git clone https://github.com/apexcharts/react-apextree.git
cd react-apextree

# install dependencies
npm install
cd demo && npm install && cd ..

# build the library
npm run build

# run the demo
npm run demo
```

Then open http://localhost:5173 to see the examples.

### Available Scripts

- `npm run build` - Build the library
- `npm run dev` - Build in watch mode
- `npm run typecheck` - Run TypeScript type checking
- `npm run demo` - Run the demo app
- `npm run demo:build` - Build the demo app
