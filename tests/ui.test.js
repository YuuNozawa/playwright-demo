const { chromium } = require('playwright');
const path = require('path');

describe('学歴の入力試験', () => {
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

  test('値が変更されたらアラートされること', async () => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('変更されました');
      await dialog.accept();
    });

    // テキストボックスに値を入力してフォーカスを外す
    const textBox = await page.$('#editMe');
    await textBox.fill('新しい値');
    await page.click('body'); // フォーカスを外す

    // アラートが表示されるのを待つ
    await page.waitForTimeout(3000);
    
  });

  test('選択がアメリカ合衆国の場合の活性状態が正しいこと', async () => {
    page.selectOption("#countryDropdown", "us");
    let fieldDisplay;
    fieldDisplay = await page.$eval("#usFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("block");

    fieldDisplay = await page.$eval("#japanFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("none");

    fieldDisplay = await page.$eval("#germanyFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("none");

    ;
    await page.screenshot({path: path.join(__dirname, '../screenshots/選択がアメリカ合衆国の場合の活性状態が正しいこと.png')});
  });

  test('選択が日本の場合の活性状態が正しいこと', async () => {
    page.selectOption("#countryDropdown", "japan");
    let fieldDisplay;
    fieldDisplay = await page.$eval("#usFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("none");

    fieldDisplay = await page.$eval("#japanFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("block");

    fieldDisplay = await page.$eval("#germanyFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("none");

    await page.screenshot({path: path.join(__dirname, '../screenshots/選択が日本の場合の活性状態が正しいこと.png')});
  });

  test('選択がドイツの場合の活性状態が正しいこと', async () => {
    page.selectOption("#countryDropdown", "germany");
    let fieldDisplay;
    fieldDisplay = await page.$eval("#usFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("none");

    fieldDisplay = await page.$eval("#japanFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("none");

    fieldDisplay = await page.$eval("#germanyFields", elm => elm.style.display);
    expect(fieldDisplay).toBe("block");

    await page.screenshot({path: path.join(__dirname, '../screenshots/選択がドイツの場合の活性状態が正しいこと.png')});
  });
});
