type MarkupSectionTagName = 'aside' | 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pull-quote'
type MarkupTagName = 'a' | 'b' | 'code' | 'em' | 'i' | 's' | 'strong' | 'sub' | 'sup' | 'u'
type ListSectionTagName = 'ul' | 'ol'
type TextAlign = 'left' | 'right' | 'center'

type Marker = TextMarker | AtomMarker
type Section = MarkupSection | ImageSection | ListSection | CardSection

interface TextMarker extends Array<any> {
  0: 0
  1: number[]
  2: number
  3: string
}

interface AtomMarker extends Array<any> {
  0: 1
  1: number[]
  2: number
  3: number
}

interface Markup extends Array<any> {
  0: MarkupTagName
  1?: string[]
}

interface Card extends Array<any> {
  0: string
  1: Record<string, any>
}

interface Atom extends Array<any> {
  0: string
  1: string
  2: Record<string, any>
}

interface MarkupSection extends Array<any> {
  0: 1
  1: MarkupSectionTagName
  2: Marker[]
  3?: MobiledocAttributes
}

interface MobiledocAttributes extends Array<any> {
  0: 'data-md-text-align'
  1: TextAlign
}

interface ImageSection extends Array<any> {
  0: 2
  1: string
}

interface ListSection extends Array<any> {
  0: 3
  1: ListSectionTagName
  2: Marker[][]
}

interface CardSection extends Array<any> {
  0: 10
  1: number
}

interface Mobiledoc {
  version: string
  sections: Section[]
  markups: Markup[]
  cards: Card[]
  atoms: Atom[]
}
