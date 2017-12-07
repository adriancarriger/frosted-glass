import { Component, Element, Method, Prop, PropWillChange } from '@stencil/core';
import { FrostedBackground } from '../../services/frosted-background/frosted-background'

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

  private latestKnownScrollY;
  private ticking: any = {};
  private glassSelector = 'frosted-glass';
  private backgrounds: FrostedBackground[] = [];
  
  componentDidLoad() {
    const glassElement = this.el.querySelector(this.glassSelector);
    this.backgrounds.push(
      new FrostedBackground(glassElement, this.blurAmount, this.el, this.glassSelector)
    );
    this.requestTick('backgroundUpdate');
    this.initListeners();
  }

  componentDidUnload() {
    this.backgrounds.forEach((background: FrostedBackground) => background.removeElements());
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

  private removeListeners() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  private updateFilter(blurAmount) {
    this.backgrounds.forEach((background: FrostedBackground) => {
      background.updateFilter(blurAmount);
    });
  }

  private initListeners() {
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll);
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.onScroll();
  }

  // @ts-ignore
  private resizeUpdate() {
    this.backgrounds.forEach((background: FrostedBackground) => {
      background.resizeUpdate();
    });
    this.scrollUpdate();
    this.ticking.resizeUpdate = false;
  }

  private scrollUpdate() {
    this.backgrounds.forEach((background: FrostedBackground) => {
      background.scrollUpdate(this.latestKnownScrollY);
    });
    this.ticking.scrollUpdate = false;
  }

  private requestTick(functionName: string) {
    if (!this.ticking[functionName]) { requestAnimationFrame(this[functionName].bind(this)); }
    this.ticking[functionName] = true;
  }

  // @ts-ignore
  private backgroundUpdate() {
    this.backgrounds.forEach((background: FrostedBackground) => {
      background.backgroundUpdate();
    });
    this.ticking.backgroundUpdate = false;
  }
}
