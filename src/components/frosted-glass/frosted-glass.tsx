import { Component, Element, Method, Prop, State } from '@stencil/core';

import { tempClosest } from '../../util';

@Component({
  tag: 'frosted-glass',
  styleUrl: 'frosted-glass.scss'
})
export class FrostedGlass {
  @Element() el: HTMLElement;
  @Prop() uuid: string;
  @Prop() overlayColor: string;
  @Prop() blurAmount = '1rem';
  @State() blurOffsetLeft = 0;
  @State() blurOffsetTop = 0;
  @State() scrollOffset = 0;
  @State() isFixed = false;

  @Method()
  updateBackground() {
    this.requestTick('blurContentUpdate');
  }

  private blurContainer: HTMLElement;
  private blurContent: HTMLElement;
  private container: HTMLElement;
  private ticking: any = {};

  componentDidLoad() {
    this.el.setAttribute('uuid', `${Math.random()}`);
    this.container = tempClosest(this.el, 'frosted-glass-container') as HTMLElement;
    this.blurContainer = this.el.querySelector('.blur-container');
    this.blurContent = this.el.querySelector('.blur-content');
    this.isFixed = getComputedStyle(this.el).position === 'fixed';
    this.requestTick('blurContentUpdate');
    this.initListeners();
  }

  componentDidUnload() {
    this.removeListeners();
  }

  onScroll() {
    this.scrollOffset = window.scrollY;
  }

  onResize() {
    const rect = this.blurContainer.getBoundingClientRect();
    this.blurOffsetLeft = rect.left;
    this.blurOffsetTop = this.isFixed ? rect.top : rect.top + window.scrollY;
  }

  render() {
    return [
      <div class="blur-container">
        <div class="blur-content" style={{
          filter: `blur(${this.blurAmount})`,
          left: `-${this.blurOffsetLeft}px`,
          top: `-${this.blurOffsetTop}px`,
          transform: `translateY(-${this.scrollOffset}px)`
        }}></div>
        <div style={{'background-color': this.overlayColor}} class="overlay"></div>
      </div>,
      <div class={`glass-content${this.isFixed ? ' fixed': ''}`}><slot /></div>
    ]
  }

  private cloneUsingDivs(original: HTMLElement): any {
    const clone = document.createElement('div');
    clone.innerHTML = ['frosted-glass', 'frosted-glass-container']
      .reduce((p, c) => p.split(c).join('div'), original.innerHTML);

    return clone;
  }

  private initListeners() {
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
    this.onResize();
    if (!this.isFixed) { return; }
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  private removeListeners() {
    window.removeEventListener('scroll', this.onScroll);
  }

  // @ts-ignore
  private blurContentUpdate() {
    const clone = this.cloneUsingDivs(this.container);
    this.removeSelected(clone, [`[uuid='${this.uuid}']`, '.blur-container']);
    this.blurContent.innerHTML = '';
    this.blurContent.innerHTML = clone.innerHTML;
    this.ticking.blurContentUpdate = false;
  }

  private removeSelected(element, selectors: string[]) {
    selectors.forEach(selector => {
      const selectedElements = element.querySelectorAll(selector) as any;
      selectedElements.forEach(selectedElement => selectedElement.remove());
    });
  }

  private requestTick(functionName: string) {
    if (!this.ticking[functionName]) { requestAnimationFrame(this[functionName].bind(this)); }
    this.ticking[functionName] = true;
  }
}
