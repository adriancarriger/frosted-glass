import { Component } from '@stencil/core';

@Component({
  tag: 'frosted-glass',
  styleUrl: 'frosted-glass.scss'
})
export class FrostedGlass {

  render() {
    return (
      <slot />
    );
  }
}
