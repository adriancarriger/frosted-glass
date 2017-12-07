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
    expect(instance.backgrounds.length).toBeGreaterThanOrEqual(1);
    instance.backgrounds.forEach(background => {
      expect(background.blurContainer).toBeDefined();
      expect(background.blurContent).toBeDefined();
      expect(background.blurContainer.innerHTML).toContain('Initial content');
    });
  });

  it('should create background styles', () => {
    instance.backgrounds.forEach(background => {
      const containerStyle = background.blurContainer.style;
      expect(containerStyle.overflow).toEqual('hidden');
      expect(containerStyle.transform).toEqual('translate3d(0, 0, 0)');
  
      const contentStyle = background.blurContent.style;
      expect(contentStyle.position).toEqual('absolute');
      expect(contentStyle.filter).toEqual('blur(5px)');
    });
  });

  it('should change the blur amount', async () => {
    element.blurAmount = '10px';
    instance.backgrounds.forEach(background => {
      const contentStyle = background.blurContent.style;
      expect(contentStyle.filter).toEqual('blur(10px)');
    });
  });

  it('should update background element', async () => {
    instance.backgrounds.forEach(background => {
      expect(background.blurContainer.innerHTML).toContain('Initial content');
    });
    await updateElementBackground('<div>Updated content</div>');
    instance.backgrounds.forEach(background => {
      expect(background.blurContainer.innerHTML).toContain('Updated content');
      expect(background.blurContainer.innerHTML).not.toContain('Nav content');
    });
  });

  it('should not update background element when ticking', async () => {
    instance.backgrounds.forEach(background => {
      expect(background.blurContainer.innerHTML).toContain('Initial content');
    });
    instance.ticking.backgroundUpdate = true;
    await updateElementBackground('<div>Updated content</div>');
    instance.backgrounds.forEach(background => {
      expect(background.blurContainer.innerHTML).not.toContain('Updated content');
    });
  });

  it('should update content without glass', async () => {
    element._instance.__el.innerHTML = `<div>New content</div>`;
    element._instance.updateBackground();
    await timeoutPromise();
    expect(instance.backgrounds[0].blurContainer.innerHTML).toContain('New content');
  });

  it('should unload', async () => {
    instance.backgrounds[0].blurContainer.setAttribute('id', 'blur-container');
    const blurContainer = () => document.getElementById('blur-container');
    expect(blurContainer()).toBeDefined();
    instance.componentDidUnload();
    expect(blurContainer()).toBeNull();
  });

  it('should update blur content on scroll if fixed', async () => {
    const fixedElement = await createComponent('fixed');
    const blurContent = fixedElement._instance.backgrounds[0].blurContent;
    expect(blurContent.style.top).toBe('-0px');
    fixedElement._instance.latestKnownScrollY = 43;
    fixedElement._instance.scrollUpdate();
    expect(blurContent.style.top).toBe('-43px');
  });

  it('should not update if scroll position has not changed', async () => {
    const fixedElement = await createComponent('fixed');
    const blurContent = fixedElement._instance.backgrounds[0].blurContent;
    expect(blurContent.style.top).toBe('-0px');
    fixedElement._instance.scrollUpdate();
    expect(blurContent.style.top).toBe('-0px');
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
  element.updateBackground();
  await timeoutPromise();
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
