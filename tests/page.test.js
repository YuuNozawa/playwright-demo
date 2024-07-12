const { chromium } = require('playwright');

describe('ページ全体の試験', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // ヘッドレスモードをオン、これで実際にブラウザは開かれない
    browser = await chromium.launch({ headless: true }); 
    page = await browser.newPage();
    await page.goto('http://localhost:4000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('ページのタイトルが正しいこと', async () => {
    const title = await page.title();
    expect(title).toBe("ありがちな実装");
  });
});
