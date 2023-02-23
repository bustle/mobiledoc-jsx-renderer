/// <reference path="./mobiledoc.d.ts" />

type ComponentGetter = (type: string) => string | ((props: Record<string, any>) => string | JSX.Element) | undefined
type Renderer = (options: RendererOptions, mobiledoc: Mobiledoc, section: Section) => JSX.Element

interface RendererOptions {
  getCardComponent: ComponentGetter
  getAtomComponent: ComponentGetter
  getMarkupComponent: ComponentGetter
}

const MarkerTypeTextId = 0
const MarkerTypeAtomId = 1
const SectionTypeMarkupId = 1
const SectionTypeImageId = 2
const SectionTypeListId = 3
const SectionTypeCardId = 10

const SectionTypeRendererMap = {
  [SectionTypeMarkupId]: MarkupSectionRenderer,
  [SectionTypeImageId]: ImageSectionRenderer,
  [SectionTypeListId]: ListSectionRenderer,
  [SectionTypeCardId]: CardSectionRenderer
} as Record<number, Renderer>

const attributesToProps = (attributes: string[]): Record<string, any> =>
  attributes.reduce((acc, value, index) => (index % 2 !== 0 ? { ...acc, [attributes[index - 1]]: value } : acc), {})

const MobiledocRendererError = (message: string) => Error('MobiledocJsxRenderer: ' + message)
const OptionError = (option: string) => MobiledocRendererError(`'${option}' option is required`)
const UnknownTagError = (tag: string) => MobiledocRendererError(`No renderer for tag: '${tag}'`)
const UnknownTypeError = (id: number, type: string) => MobiledocRendererError(`Unknown ${type} id: '${id}'`)

export function MobiledocJsxRenderer(options?: Partial<RendererOptions>) {
  const defaults = {
    getCardComponent: () => {
      throw OptionError('getCardComponent')
    },
    getAtomComponent: () => {
      throw OptionError('getAtomComponent')
    },
    getMarkupComponent: (tagName: string) => tagName
  }
  const mergedOptions = { ...defaults, ...options }
  return function MobiledocElement(mobiledoc: Mobiledoc) {
    return <>{mobiledoc.sections.map((section) => SectionRenderer(mergedOptions, mobiledoc, section))}</>
  }
}

function SectionRenderer(options: RendererOptions, mobiledoc: Mobiledoc, section: Section) {
  const sectionType = section[0]
  const SectionRendererType = SectionTypeRendererMap[sectionType]
  if (!SectionRendererType) throw UnknownTypeError(sectionType, 'section')
  return SectionRendererType(options, mobiledoc, section)
}

function ImageSectionRenderer(options: RendererOptions, mobiledoc: Mobiledoc, [, src]: ImageSection) {
  const tagName = 'img'
  const Tag = options.getMarkupComponent(tagName)
  if (!Tag) throw UnknownTagError(tagName)
  return <Tag src={src} />
}

function ListSectionRenderer(options: RendererOptions, mobiledoc: Mobiledoc, [, tagName, items]: ListSection) {
  const { getMarkupComponent } = options
  const Tag = getMarkupComponent(tagName)
  const ItemTag = getMarkupComponent('li')
  if (!Tag || !ItemTag) throw UnknownTagError(`${tagName} or li`)
  return (
    <Tag>
      {items.map((item, i) => (
        <ItemTag key={i}>{MarkersRenderer(options, mobiledoc, item)}</ItemTag> // eslint-disable-line react/no-array-index-key
      ))}
    </Tag>
  )
}

function CardSectionRenderer(options: RendererOptions, mobiledoc: Mobiledoc, [, index]: CardSection) {
  const [type, payload] = mobiledoc.cards[index]
  const Tag = options.getCardComponent(type)
  if (!Tag) throw UnknownTagError(type)
  return <Tag payload={payload} />
}

function MarkupSectionRenderer(
  options: RendererOptions,
  mobiledoc: Mobiledoc,
  [, tagName, markers, attributes]: MarkupSection
) {
  const Tag = options.getMarkupComponent(tagName)
  if (!Tag) throw UnknownTagError(tagName)
  return <Tag {...attributesToProps(attributes || [])}>{MarkersRenderer(options, mobiledoc, markers)}</Tag>
}

function MarkupRenderer(options: RendererOptions, [tagName, attributes]: Markup) {
  const Tag = options.getMarkupComponent(tagName)
  if (!Tag) throw UnknownTagError(tagName)
  return <Tag {...attributesToProps(attributes || [])}>{[]}</Tag>
}

function AtomRenderer(options: RendererOptions, [type, text, payload]: Atom) {
  const Tag = options.getAtomComponent(type)
  if (!Tag) throw UnknownTagError(type)
  return <Tag payload={payload}>{text}</Tag>
}

function MarkersRenderer(options: RendererOptions, mobiledoc: Mobiledoc, markers: Marker[]) {
  let currentElement = <>{[]}</>
  const children = [currentElement]

  for (let i = 0, ilen = markers.length; i < ilen; i++) {
    const [type, openTypes, closeCount, value] = markers[i]
    for (let j = 0, jlen = openTypes.length; j < jlen; j++) {
      const markup = mobiledoc.markups[openTypes[j]]
      const markupElement = MarkupRenderer(options, markup)
      currentElement.props.children.push(markupElement)
      children.push(markupElement)
      currentElement = markupElement
    }

    if (type === MarkerTypeTextId) currentElement.props.children.push(value)
    else if (type === MarkerTypeAtomId)
      currentElement.props.children.push(AtomRenderer(options, mobiledoc.atoms[value as number]))
    else throw UnknownTypeError(type, 'marker')

    for (let j = 0; j < closeCount; j++) {
      children.pop()
      currentElement = children[children.length - 1]
    }
  }

  return currentElement
}
