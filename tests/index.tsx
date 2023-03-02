import { MobiledocJsxRenderer } from '../src'
import { renderToString as reactRenderToString } from 'react-dom/server'
import preactRenderToString from 'preact-render-to-string'
import { strictEqual, throws } from 'assert'
import { describe, it } from 'node:test'
import { specs, SimpleMobiledoc, CardMobiledoc } from './specs'

const usingPreact = process.argv.slice(2)[0] === '--preact'
const renderToString = usingPreact ? preactRenderToString : reactRenderToString

describe('MobiledocJsxRenderer', () => {
  describe('Renders Mobiledoc to JSX then to an HTML string', () => {
    const renderer = MobiledocJsxRenderer({
      getCardComponent: (type) => {
        if (type === 'image-card')
          return function ImageCard(props) {
            return (
              <figure>
                <img src={props.payload.src} />
                <figcaption>{props.payload.caption}</figcaption>
              </figure>
            )
          }
      },
      getAtomComponent: (type) => {
        if (type === 'clicker-atom')
          return function ClickerAtom(props) {
            return <span data-clicks={props.payload.clicks}>{props.children}</span>
          }
      },
      getMarkupComponent: (tag) => {
        if (tag === 'a')
          return function CustomA(props) {
            return <a target="_blank" {...props} />
          }
        return tag
      }
    })

    specs.forEach(([title, mobiledoc, expectedHtml]) => {
      it(title, () => {
        const output = renderToString(renderer(mobiledoc))
        const adjustedOutout = usingPreact ? output.replace(/ \/>/g, '/>') : output // Preact adds a space before closing void elements
        console.log('\n\n', adjustedOutout, '\n\n') // eslint-disable-line no-console
        strictEqual(adjustedOutout, expectedHtml)
      })
    })
  })

  describe('Throws with invalid options', () => {
    it('throws when card but no card renderer', () => {
      const renderer = MobiledocJsxRenderer()
      throws(() => {
        renderer(CardMobiledoc)
      })
    })

    it('throws when no matching markup renderer', () => {
      const renderer = MobiledocJsxRenderer({
        getMarkupComponent: () => undefined
      })
      throws(() => {
        renderer(SimpleMobiledoc)
      })
    })
  })
})
