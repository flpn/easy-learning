import { EasyLearningPage } from './app.po';

describe('easy-learning App', () => {
  let page: EasyLearningPage;

  beforeEach(() => {
    page = new EasyLearningPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
