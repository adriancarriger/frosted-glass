import { Component } from '@stencil/core';

@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {
  render() {
    return (
      <frosted-glass glass-selector="#glass">
        <div id="app" class="hello">
          <h1>Welcome!</h1>
          <div id="glass" class="sticky-header">
            <div class="nav-content">test content</div>
          </div>
        </div>
      </frosted-glass>
    );
  }
}
