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
      width={800}
      height={600}
      direction="top"
      nodeWidth={120}
      nodeHeight={80}
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

  const handleChangeLayout = () => {
    treeRef.current?.changeLayout("left");
  };

  const handleCollapse = (nodeId: string) => {
    treeRef.current?.collapse(nodeId);
  };

  const handleExpand = (nodeId: string) => {
    treeRef.current?.expand(nodeId);
  };

  const handleFitScreen = () => {
    treeRef.current?.fitScreen();
  };

  return (
    <div>
      <button onClick={handleChangeLayout}>Change Layout</button>
      <button onClick={handleFitScreen}>Fit Screen</button>

      <ApexTreeChart ref={treeRef} data={data} width={800} height={600} />
    </div>
  );
}
```

## Custom Node Templates

```tsx
<ApexTreeChart
  data={data}
  width={800}
  height={600}
  contentKey="data"
  nodeWidth={150}
  nodeHeight={100}
  nodeTemplate={(content) => `
    <div style="display: flex; flex-direction: column; align-items: center; height: 100%;">
      <img 
        src="${content.imageURL}" 
        style="width: 50px; height: 50px; border-radius: 50%;" 
      />
      <div style="font-weight: bold;">${content.name}</div>
    </div>
  `}
/>
```

## Props

| Prop                   | Type                                     | Default      | Description                         |
| ---------------------- | ---------------------------------------- | ------------ | ----------------------------------- |
| `data`                 | `NodeData`                               | **required** | Tree data structure                 |
| `width`                | `number \| string`                       | `400`        | Width of the container              |
| `height`               | `number \| string`                       | `400`        | Height of the container             |
| `direction`            | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`      | Direction of tree growth            |
| `contentKey`           | `string`                                 | `'name'`     | Key for node content                |
| `siblingSpacing`       | `number`                                 | `50`         | Spacing between siblings            |
| `childrenSpacing`      | `number`                                 | `50`         | Spacing between parent and children |
| `nodeWidth`            | `number`                                 | `50`         | Width of nodes                      |
| `nodeHeight`           | `number`                                 | `30`         | Height of nodes                     |
| `nodeTemplate`         | `(content: unknown) => string`           | -            | Custom HTML template for nodes      |
| `nodeStyle`            | `string`                                 | -            | CSS styles for nodes                |
| `nodeBGColor`          | `string`                                 | `'#FFFFFF'`  | Node background color               |
| `nodeBGColorHover`     | `string`                                 | `'#FFFFFF'`  | Node background color on hover      |
| `borderWidth`          | `number`                                 | `1`          | Node border width                   |
| `borderStyle`          | `string`                                 | `'solid'`    | Node border style                   |
| `borderRadius`         | `string`                                 | `'5px'`      | Node border radius                  |
| `borderColor`          | `string`                                 | `'#BCBCBC'`  | Node border color                   |
| `borderColorHover`     | `string`                                 | `'#5C6BC0'`  | Node border color on hover          |
| `edgeWidth`            | `number`                                 | `1`          | Edge line width                     |
| `edgeColor`            | `string`                                 | `'#BCBCBC'`  | Edge line color                     |
| `edgeColorHover`       | `string`                                 | `'#5C6BC0'`  | Edge line color on hover            |
| `fontSize`             | `string`                                 | `'14px'`     | Font size                           |
| `fontFamily`           | `string`                                 | -            | Font family                         |
| `fontWeight`           | `string`                                 | `'400'`      | Font weight                         |
| `fontColor`            | `string`                                 | `'#000000'`  | Font color                          |
| `highlightOnHover`     | `boolean`                                | `true`       | Enable highlight on hover           |
| `enableToolbar`        | `boolean`                                | `false`      | Show toolbar                        |
| `enableExpandCollapse` | `boolean`                                | `false`      | Enable expand/collapse buttons      |
| `enableTooltip`        | `boolean`                                | `false`      | Enable tooltips                     |
| `tooltipTemplate`      | `(content: unknown) => string`           | -            | Custom tooltip template             |
| `groupLeafNodes`       | `boolean`                                | `false`      | Stack leaf nodes                    |
| `onNodeClick`          | `(node: NodeData) => void`               | -            | Node click handler                  |
| `className`            | `string`                                 | -            | CSS class for container             |
| `style`                | `CSSProperties`                          | -            | Inline styles for container         |
| `canvasStyle`          | `string`                                 | -            | CSS styles for canvas               |

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
interface NodeData<T = unknown> {
  id: string; // unique identifier
  name?: string; // display name (or use contentKey)
  data?: T; // custom data for templates
  options?: NodeOptions; // per-node styling
  children?: NodeData<T>[];
}

interface NodeOptions {
  nodeBGColor?: string;
  nodeBGColorHover?: string;
  borderColor?: string;
  borderColorHover?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  fontColor?: string;
}
```

## TypeScript Support

Full TypeScript support with exported types:

```ts
import type {
  ApexTreeProps,
  ApexTreeRef,
  NodeData,
  NodeOptions,
  TreeDirection,
  GraphInstance,
} from "react-apextree";
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
