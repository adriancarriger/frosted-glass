import { render } from '@stencil/core/testing';
import { FrostedGlassContainer } from '../frosted-glass-container/frosted-glass-container';
import { FrostedGlass } from '../frosted-glass/frosted-glass';

describe('frosted-glass', () => {
  beforeAll(() => window.requestAnimationFrame = mockRequestAnimationFrame);

  let elements
  let element;
  let container;
  let instance;
  let blurContent;
  async function updateElementBackground(content) {
    await updateBackground(elements, content);
  }

  beforeEach(async () => {
    elements = await createComponent();
    element = elements.frostedGlass;
    container = elements.container;
    instance = element._instance;
    blurContent = instance.__el.querySelector('.blur-content');
  });

  afterEach(() => {
    instance.componentDidUnload();
  });

  it('should build', () => {
    expect(new FrostedGlass()).toBeTruthy();
  });

  it('should render', () => {
    expect(element).toBeTruthy();
    expect(glassIsFixed(element)).toEqual(false);
  });

  it('should change the blur amount', async () => {
    element.blurAmount = '10px';
    await timeoutPromise();
    const contentStyle = blurContent.style;
    expect(contentStyle.filter).toEqual('blur(10px)');
  });

  it('should update background element', async () => {
    expect(container._instance.__el.innerHTML).toContain('Initial content');
    await updateElementBackground('<div>Updated content</div>');
    expect(container._instance.__el.innerHTML).toContain('Updated content');
  });

  it('should not update background element when ticking', async () => {
    expect(blurContent.innerHTML).toContain('Initial content');
    instance.ticking.blurContentUpdate = true;
    await updateElementBackground('<div>Updated content</div>');
    expect(blurContent.innerHTML).not.toContain('Updated content');
  });

  it('should set the fixed class', async () => {
    const fixedElements = await createComponent(true);
    expect(glassIsFixed(fixedElements.frostedGlass)).toEqual(true);
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

async function updateBackground(elements, newContent) {
  const newHtml = `${newContent}<frosted-glass>Nav content</frosted-glass>`;
  elements.container._instance.__el.innerHTML = newHtml;
  elements.frostedGlass.updateBackground();
  await timeoutPromise();
}

async function createComponent(isFixed = false) {
  const style = isFixed ? ' style="position:fixed"': ''
  const containerElement = await render({
    components: [FrostedGlassContainer, FrostedGlass],
    html: `
    <frosted-glass-container>
      <div>Initial content</div>
      <frosted-glass${style}>Nav content</frosted-glass>
    </frosted-glass-container>
    `
  });
  await timeoutPromise();
  return {
    container: containerElement,
    frostedGlass: containerElement.querySelector('frosted-glass')
  };
}

function mockRequestAnimationFrame(inputFunction: Function) {
  setTimeout(inputFunction);
  return 1;
}

function glassIsFixed(glass) {
  return glass.querySelector('.glass-content').classList.contains('fixed');
}
