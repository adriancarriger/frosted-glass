import { render } from '@stencil/core/testing';
import { FrostedGlassContainer } from './frosted-glass-container';
import { FrostedGlass } from '../frosted-glass/frosted-glass';

describe('frosted-glass', () => {
  beforeAll(() => window.requestAnimationFrame = mockRequestAnimationFrame);

  let element;
  let instance;
  async function updateElementBackground(content) {
    await updateBackground(element, content);
  }

  beforeEach(async () => {
    element = await createComponent();
    instance = element._instance;
    await timeoutPromise();
  });

  afterEach(() => {
    instance.componentDidUnload();
  });

  it('should build', () => {
    expect(new FrostedGlassContainer()).toBeTruthy();
  });

  it('should create background elements', async () => {
    expect(instance.blurContainer).toBeDefined();
    expect(instance.blurContent).toBeDefined();
    expect(instance.blurContainer.innerHTML).toContain('Initial content');
  });

  it('should create background styles', () => {
    const containerStyle = instance.blurContainer.style;
    expect(containerStyle.overflow).toEqual('hidden');
    expect(containerStyle.transform).toEqual('translate3d(0, 0, 0)');

    const contentStyle = instance.blurContent.style;
    expect(contentStyle.position).toEqual('absolute');
    expect(contentStyle.filter).toEqual('blur(5px)');
  });

  it('should change the blur amount', async () => {
    element.blurAmount = '10px';
    const contentStyle = instance.blurContent.style;
    expect(contentStyle.filter).toEqual('blur(10px)');
  });

  it('should update background element', async () => {
    expect(instance.blurContainer.innerHTML).toContain('Initial content');
    await updateElementBackground('<div>Updated content</div>');
    expect(instance.blurContainer.innerHTML).toContain('Updated content');
    expect(instance.blurContainer.innerHTML).not.toContain('Nav content');
  });

  it('should not update background element when ticking', async () => {
    instance.ticking.backgroundUpdate = true;
    await updateElementBackground('<div>Updated content</div>');
    expect(instance.blurContainer.innerHTML).not.toContain('Updated content');
  });

  it('should update content without glass', async () => {
    element._instance.__el.innerHTML = `<div>New content</div>`;
    element._instance.updateBackground();
    await timeoutPromise();
    expect(instance.blurContainer.innerHTML).toContain('New content');
  });

  it('should unload', async () => {
    instance.blurContainer.setAttribute('id', 'blur-container');
    const blurContainer = () => document.getElementById('blur-container');
    expect(blurContainer()).toBeDefined();
    instance.componentDidUnload();
    expect(blurContainer()).toBeNull();
  });

  it('should bind onScroll if position is fixed', async () => {
    const fixedElement = await createComponent('fixed');
    expect(isBound(element._instance.onScroll)).toBe(false);
    expect(isBound(fixedElement._instance.onScroll)).toBe(true);
  });
});

function timeoutPromise(inputFunction = () => {}, time = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      inputFunction();
      resolve();
    }, time);
  })
}

async function updateBackground(element, newContent) {
  element._instance.__el.innerHTML = `${newContent}<frosted-glass>Nav content</frosted-glass>`;
  element._instance.updateBackground();
  await timeoutPromise();
}

function isBound(inputFunction) {
  return inputFunction.prototype === undefined;
}

async function createComponent(position?: string) {
  const style = position ? `style="position:${position}" `: ''
  const fixedElement = await render({
    components: [FrostedGlassContainer, FrostedGlass],
    html: `
    <frosted-glass-container>
      <div>Initial content</div>
      <frosted-glass ${style}>Nav content</frosted-glass>
    </frosted-glass-container>
    `
  });
  await timeoutPromise();
  return fixedElement;
}

function mockRequestAnimationFrame(inputFunction: Function) {
  setTimeout(inputFunction);
  return 1;
}
