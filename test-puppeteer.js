const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  try {
    await page.evaluate(async () => {
      await fetch('/', { headers: { authorization: 'Bearer \n' } });
    });
  } catch (e) {
    console.log("CHROME ERROR:");
    console.log(e.message);
  }
  await browser.close();
})();
