import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'frosted-glass-container',
  styleUrl: 'frosted-glass-container.scss'
})
export class FrostedGlassContainer {
  @Prop() stretch = false;

  render() {
    return (
      <div class={this.stretch ? `stretch` : ''}>
        <slot />
      </div>
    );
  }
}
