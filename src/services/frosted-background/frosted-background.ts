export class FrostedBackground {
  private directions: string[] = ['top', 'left', 'right'];
  private topOffset = 0;
  private blurContainer: HTMLElement;
  private blurContent: HTMLElement;

  private glassElement: HTMLElement;
  private blurAmount: string;
  private el: HTMLElement; // parentEl
  private glassSelector: string; // temp

  constructor(element, blurAmount, parentEl, glassSelector) {
    this.blurAmount = blurAmount;
    this.glassElement = element;
    this.el = parentEl;
    this.glassSelector = glassSelector;
    this.createNewElements();
    this.addBaseStyles();
  }

  private createNewElements() {
    this.blurContainer = document.createElement('div');
    this.blurContent = document.createElement('div');
    this.blurContainer.appendChild(this.blurContent);
    document.querySelector('body').appendChild(this.blurContainer);
  }

  removeElements() {
    this.blurContainer.remove();
  }

  private addBaseStyles() {
    Object.assign(this.blurContainer.style, {
      overflow: 'hidden',
      transform: 'translate3d(0, 0, 0)'
    });

    this.blurContent.style.position = 'absolute';
    this.updateFilter(this.blurAmount);
  }

  updateFilter(blurAmount) {
    this.blurContent.style.filter = `blur(${blurAmount})`;
  }

  // @ts-ignore
  resizeUpdate() {
    const elementStyle: CSSStyleDeclaration = window.getComputedStyle(this.glassElement);
    this.topOffset = parseInt(elementStyle.top, 10);

    ['position', 'height', ...this.directions].forEach((item) => {
      this.blurContainer.style[item] = elementStyle[item];
    });

    this.directions.forEach((item) => { this.blurContent.style[item] = `-${elementStyle[item]}`; });
    this.blurContent.style.width = window.getComputedStyle(this.el.firstElementChild).width;
  }

  scrollUpdate(latestKnownScrollY) {
    if (window.getComputedStyle(this.glassElement).position === 'fixed') {
      const scrollOffset = latestKnownScrollY + (this.topOffset || 0);
      this.blurContent.style.top = `-${scrollOffset}px`;
    }
  }

  // @ts-ignore
  backgroundUpdate() {
    this.blurContent.innerHTML = this.el.innerHTML;
    const glassClone = this.blurContent.querySelector(this.glassSelector);
    if (glassClone) { glassClone.remove(); }
  }
}
