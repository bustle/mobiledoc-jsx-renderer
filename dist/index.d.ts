/// <reference path="./mobiledoc.d.ts" />
/// <reference types="react" />
type ComponentGetter = (type: string) => string | ((props: Record<string, any>) => string | JSX.Element) | undefined;
interface RendererOptions {
    getCardComponent: ComponentGetter;
    getAtomComponent: ComponentGetter;
    getMarkupComponent: ComponentGetter;
}
export declare function MobiledocJsxRenderer(options?: Partial<RendererOptions>): (mobiledoc: Mobiledoc) => JSX.Element;
export {};
