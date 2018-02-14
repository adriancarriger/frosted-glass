import { render } from '@stencil/core/testing';
import { FrostedGlassContainer } from './frosted-glass-container';

describe('frosted-glass', () => {
  let element;

  beforeEach(async () => {
    element = await render({
      components: [FrostedGlassContainer],
      html: `<frosted-glass-container stretch="true"></frosted-glass-container>`
    });
  });

  it('should build', () => {
    expect(new FrostedGlassContainer()).toBeTruthy();
  });

  it('should render', () => {
    expect(element).toBeTruthy();
  });
});
