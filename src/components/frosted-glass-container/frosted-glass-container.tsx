import { Component, Element, Method, Prop, PropWillChange } from '@stencil/core';

@Component({
  tag: 'frosted-glass-container',
  styleUrl: 'frosted-glass-container.scss'
})
export class FrostedGlassContainer {
  @Prop() blurAmount = '5px';

  @Method()
  updateBackground() {
    this.requestTick('backgroundUpdate');
  }

  @PropWillChange('blurAmount')
  blurAmountChangeHandler(newValue: string) {
    this.updateFilter(newValue);
  }

  @Element() el: HTMLElement;

  private directions: string[] = ['top', 'left', 'right'];
  private topOffset = 0;
  private blurContainer: HTMLElement;
  private blurContent: HTMLElement;
  private ticking: any = {};
  private latestKnownScrollY: number;
  private glassElement: HTMLElement;
  private glassSelector = 'frosted-glass'
  
  componentDidLoad() {
    this.glassElement = this.el.querySelector(this.glassSelector);
    this.createNewElements();
    this.addBaseStyles();
    this.initListeners();
  }

  componentDidUnload() {
    this.removeElements();
    this.removeListeners();
  }

  onResize() {
    this.requestTick('resizeUpdate');
  }

  onScroll() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick('scrollUpdate');
  }

  render() {
    return (
      <slot />
    );
  }

  private createNewElements() {
    this.blurContainer = document.createElement('div');
    this.blurContent = document.createElement('div');
    this.blurContainer.appendChild(this.blurContent);
    document.querySelector('body').appendChild(this.blurContainer);
    this.requestTick('backgroundUpdate');
  }

  private removeElements() {
    this.blurContainer.remove();
  }

  private removeListeners() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  private addBaseStyles() {
    Object.assign(this.blurContainer.style, {
      overflow: 'hidden',
      transform: 'translate3d(0, 0, 0)'
    });

    this.blurContent.style.position = 'absolute';
    this.updateFilter(this.blurAmount);
  }

  private updateFilter(blurAmount) {
    this.blurContent.style.filter = `blur(${blurAmount})`;
  }

  private initListeners() {
    if (this.glassSelector && this.glassElement && window.getComputedStyle(this.glassElement).position === 'fixed') {
      this.onScroll = this.onScroll.bind(this);
      window.addEventListener('scroll', this.onScroll);
    }
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.onScroll();
  }

  // @ts-ignore
  private resizeUpdate() {
    const elementStyle = window.getComputedStyle(this.glassElement);
    const appStyle = window.getComputedStyle(this.el.firstElementChild);
    this.topOffset = parseInt(elementStyle.top, 10);

    ['position', 'height', ...this.directions].forEach((item) => {
      this.blurContainer.style[item] = elementStyle[item];
    });

    this.directions.forEach((item) => { this.blurContent.style[item] = `-${elementStyle[item]}`; });
    this.blurContent.style.width = appStyle.width;
    this.scrollUpdate();
    this.ticking.resizeUpdate = false;
  }

  private scrollUpdate() {
    const scrollOffset = this.latestKnownScrollY + this.topOffset;
    this.blurContent.style.top = `-${scrollOffset}px`;
    this.ticking.scrollUpdate = false;
  }

  private requestTick(functionName: string) {
    if (!this.ticking[functionName]) { requestAnimationFrame(this[functionName].bind(this)); }
    this.ticking[functionName] = true;
  }

  // @ts-ignore
  private backgroundUpdate() {
    this.blurContent.innerHTML = this.el.innerHTML;
    const glassClone = this.blurContent.querySelector(this.glassSelector);
    if (glassClone) { glassClone.remove(); }
    this.ticking.backgroundUpdate = false;
  }
}
