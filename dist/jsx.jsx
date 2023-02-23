"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const MarkerTypeTextId = 0;
const MarkerTypeAtomId = 1;
const SectionTypeMarkupId = 1;
const SectionTypeImageId = 2;
const SectionTypeListId = 3;
const SectionTypeCardId = 10;
const SectionTypeRendererMap = {
  [SectionTypeMarkupId]: MarkupSectionRenderer,
  [SectionTypeImageId]: ImageSectionRenderer,
  [SectionTypeListId]: ListSectionRenderer,
  [SectionTypeCardId]: CardSectionRenderer
};
const attributesToProps = (attributes) => attributes.reduce((acc, value, index) => index % 2 !== 0 ? __spreadProps(__spreadValues({}, acc), { [attributes[index - 1]]: value }) : acc, {});
const MobiledocRendererError = (message) => Error("MobiledocJsxRenderer: " + message);
const OptionError = (option) => MobiledocRendererError(`'${option}' option is required`);
const UnknownTagError = (tag) => MobiledocRendererError(`No renderer for tag: '${tag}'`);
const UnknownTypeError = (id, type) => MobiledocRendererError(`Unknown ${type} id: '${id}'`);
export function MobiledocJsxRenderer(options) {
  const defaults = {
    getCardComponent: () => {
      throw OptionError("getCardComponent");
    },
    getAtomComponent: () => {
      throw OptionError("getAtomComponent");
    },
    getMarkupComponent: (tagName) => tagName
  };
  const mergedOptions = __spreadValues(__spreadValues({}, defaults), options);
  return function MobiledocElement(mobiledoc) {
    return <>{mobiledoc.sections.map((section) => SectionRenderer(mergedOptions, mobiledoc, section))}</>;
  };
}
function SectionRenderer(options, mobiledoc, section) {
  const sectionType = section[0];
  const SectionRendererType = SectionTypeRendererMap[sectionType];
  if (!SectionRendererType)
    throw UnknownTypeError(sectionType, "section");
  return SectionRendererType(options, mobiledoc, section);
}
function ImageSectionRenderer(options, mobiledoc, [, src]) {
  const tagName = "img";
  const Tag = options.getMarkupComponent(tagName);
  if (!Tag)
    throw UnknownTagError(tagName);
  return <Tag src={src} />;
}
function ListSectionRenderer(options, mobiledoc, [, tagName, items]) {
  const { getMarkupComponent } = options;
  const Tag = getMarkupComponent(tagName);
  const ItemTag = getMarkupComponent("li");
  if (!Tag || !ItemTag)
    throw UnknownTagError(`${tagName} or li`);
  return <Tag>{items.map((item, i) => <ItemTag key={i}>{MarkersRenderer(options, mobiledoc, item)}</ItemTag>)}</Tag>;
}
function CardSectionRenderer(options, mobiledoc, [, index]) {
  const [type, payload] = mobiledoc.cards[index];
  const Tag = options.getCardComponent(type);
  if (!Tag)
    throw UnknownTagError(type);
  return <Tag payload={payload} />;
}
function MarkupSectionRenderer(options, mobiledoc, [, tagName, markers, attributes]) {
  const Tag = options.getMarkupComponent(tagName);
  if (!Tag)
    throw UnknownTagError(tagName);
  return <Tag {...attributesToProps(attributes || [])}>{MarkersRenderer(options, mobiledoc, markers)}</Tag>;
}
function MarkupRenderer(options, [tagName, attributes]) {
  const Tag = options.getMarkupComponent(tagName);
  if (!Tag)
    throw UnknownTagError(tagName);
  return <Tag {...attributesToProps(attributes || [])}>{[]}</Tag>;
}
function AtomRenderer(options, [type, text, payload]) {
  const Tag = options.getAtomComponent(type);
  if (!Tag)
    throw UnknownTagError(type);
  return <Tag payload={payload}>{text}</Tag>;
}
function MarkersRenderer(options, mobiledoc, markers) {
  let currentElement = <>{[]}</>;
  const children = [currentElement];
  for (let i = 0, ilen = markers.length; i < ilen; i++) {
    const [type, openTypes, closeCount, value] = markers[i];
    for (let j = 0, jlen = openTypes.length; j < jlen; j++) {
      const markup = mobiledoc.markups[openTypes[j]];
      const markupElement = MarkupRenderer(options, markup);
      currentElement.props.children.push(markupElement);
      children.push(markupElement);
      currentElement = markupElement;
    }
    if (type === MarkerTypeTextId)
      currentElement.props.children.push(value);
    else if (type === MarkerTypeAtomId)
      currentElement.props.children.push(AtomRenderer(options, mobiledoc.atoms[value]));
    else
      throw UnknownTypeError(type, "marker");
    for (let j = 0; j < closeCount; j++) {
      children.pop();
      currentElement = children[children.length - 1];
    }
  }
  return currentElement;
}
