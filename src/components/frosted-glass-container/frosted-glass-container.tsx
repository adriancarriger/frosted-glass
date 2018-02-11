import { Component } from '@stencil/core';

@Component({
  tag: 'frosted-glass-container',
  styleUrl: 'frosted-glass-container.scss'
})
export class FrostedGlassContainer {
  render() {
    return (
      <slot />
    );
  }
}
