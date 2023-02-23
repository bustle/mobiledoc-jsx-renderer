# mobiledoc-jsx-renderer

Renders [mobiledoc](https://bustle.github.io/mobiledoc-kit/demo/) to JSX

Similar to [mobiledoc-vdom-renderer](https://github.com/bustle/mobiledoc-vdom-renderer) but returns raw jsx instead of directly calling `createElement`. This allows consumers to transform it via their own tooling if they want to use the newer react-jsx transform, preact, etc.

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
