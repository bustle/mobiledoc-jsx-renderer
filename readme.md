# mobiledoc-jsx-renderer

Renders [mobiledoc](https://bustle.github.io/mobiledoc-kit/demo/) to JSX

Similar to [mobiledoc-vdom-renderer](https://github.com/bustle/mobiledoc-vdom-renderer) but returns jsx instead of directly invoking a supplied `createElement` function. This allows consumers to transform it via their own tooling if they want to use the newer react-jsx transform, preact, etc.

### Install

```
npm install mobiledoc-jsx-renderer --save
```

### Usage

```js
import { MobiledocJsxRenderer } from 'mobiledoc-jsx-renderer'

const render = MobiledocJsxRenderer()
render(mobiledoc)
```

### Options

```ts
interface MobiledocJsxRendererOptions {
  getCardComponent?: (card: string) => JSX.Element // Required if you have custom cards to renderer
  getAtomComponent?: (atom: string) => JSX.Element // Required if you have custom atoms to renderer
  getMarkupComponent?: (tag: string) => JSX.Element // Optional, allowing you to alter/change output for markup tags
}
```

### Raw JSX

Out of the box, the JSX is transformed to js using `react/jsx-runtime`. If you want the the raw jsx to transform yourself, import at:

```js
import { MobiledocJsxRenderer } from 'mobiledoc-jsx-renderer/jsx'
```
