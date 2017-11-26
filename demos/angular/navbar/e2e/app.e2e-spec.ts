import { NavbarPage } from './app.po';

describe('navbar App', () => {
  let page: NavbarPage;

  beforeEach(() => {
    page = new NavbarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
