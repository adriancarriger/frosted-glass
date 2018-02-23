import { render } from '@stencil/core/testing';
import { FrostedGlassContainer } from '../frosted-glass-container/frosted-glass-container';
import { FrostedGlass } from '../frosted-glass/frosted-glass';

describe('frosted-glass', () => {
  beforeAll(() => window.requestAnimationFrame = mockRequestAnimationFrame);

  let elements
  let element;
  let container;
  let blurContent;
  async function updateElementBackground(content) {
    await updateBackground(elements, content);
  }

  beforeEach(async () => {
    elements = await createComponent();
    element = elements.frostedGlass;
    container = elements.container;
    blurContent = element.querySelector('.blur-content');
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
    expect(container.innerHTML).toContain('Initial content');
    await updateElementBackground('<div>Updated content</div>');
    expect(container.innerHTML).toContain('Updated content');
  });

  it('should not update background element when ticking', async () => {
    expect(blurContent.innerHTML).toContain('Initial content');
    updateElementBackground('<div>Updated content-1</div>')
    await updateElementBackground('<div>Updated content-2</div>');
    expect(blurContent.innerHTML).not.toContain('Updated content-2');
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
  elements.container.innerHTML = newHtml;
  elements.frostedGlass.updateBackground();
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
