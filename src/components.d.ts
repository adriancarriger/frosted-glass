/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */


import {
  FrostedGlass as FrostedGlass
} from './components/frosted-glass/frosted-glass';

interface HTMLFrostedGlassElement extends FrostedGlass, HTMLElement {
}
declare var HTMLFrostedGlassElement: {
  prototype: HTMLFrostedGlassElement;
  new (): HTMLFrostedGlassElement;
};
declare global {
  interface HTMLElementTagNameMap {
      "frosted-glass": HTMLFrostedGlassElement;
  }
  interface ElementTagNameMap {
      "frosted-glass": HTMLFrostedGlassElement;
  }
  namespace JSX {
      interface IntrinsicElements {
          "frosted-glass": JSXElements.FrostedGlassAttributes;
      }
  }
  namespace JSXElements {
      export interface FrostedGlassAttributes extends HTMLAttributes {
          mode?: string,
          color?: string,
        
          backgroundSelector?: string,
          blurAmount?: string
      }
  }
}

