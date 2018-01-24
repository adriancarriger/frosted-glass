import { Component, Element, Method, Prop, State } from '@stencil/core';

import { tempClosest } from '../../util';

@Component({
  tag: 'frosted-glass',
  styleUrl: 'frosted-glass.scss'
})
export class FrostedGlass {
  @Element() el: HTMLElement;
  @Prop() blurAmount = '5px';
  @Prop() isClone = false;
  @State() scrollOffset = 0;

  @Method()
  updateBackground() {
    this.requestTick('blurContentUpdate');
  }

  private blurContent: HTMLElement;
  private container: HTMLElement;
  private ticking: any = {};
  private topOffset = 0;

  componentDidLoad() {
    if (this.isClone) { this.el.remove(); return; }
    this.container = tempClosest(this.el, 'frosted-glass-container') as HTMLElement;
    this.blurContent = this.el.querySelector('.blur-content');
    this.requestTick('blurContentUpdate');
    this.initListeners();
  }

  componentDidUnload() {
    this.removeListeners();
  }

  onScroll() {
    this.scrollOffset = window.scrollY + (this.topOffset || 0);
  }

  render() {
    return [
      <div class="blur-container">
        <div class="blur-content" style={{
          filter: `blur(${this.blurAmount})`,
          transform: `translateY(-${this.scrollOffset}px)`
        }}></div>
      </div>,
      <div class="glass-content"><slot /></div>
    ]
  }

  private markAsCloned(html: string) {
    return ['frosted-glass', 'frosted-glass-container'].reduce((p, c) => {
      return p
        .split(`<${c}`)
        .join(`<${c} is-clone="true"`);
    }, html);
  }

  private initListeners() {
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  private removeListeners() {
    window.removeEventListener('scroll', this.onScroll);
  }

  // @ts-ignore
  private blurContentUpdate() {
    this.blurContent.innerHTML = this.markAsCloned(this.container.innerHTML);
    this.ticking.blurContentUpdate = false;
  }

  private requestTick(functionName: string) {
    if (!this.ticking[functionName]) { requestAnimationFrame(this[functionName].bind(this)); }
    this.ticking[functionName] = true;
  }
}
