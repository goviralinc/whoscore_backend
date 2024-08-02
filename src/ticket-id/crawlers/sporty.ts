// sporty.ts
import puppeteer, { Browser, Page } from 'puppeteer';
import puppeteerConfig from 'puppeteer.config';

export const crawlSportyTicket = async (ticketId: string): Promise<any> => {
  const apiUrl = `https://www.sportybet.com/api/ng/orders/share/${ticketId}`;

  try {
    const browser: Browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteerConfig.executablePath,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't work in Windows
        '--disable-gpu',
      ],
    });

    const page: Page = await browser.newPage();
    await page.goto(apiUrl);

    const data = await page.evaluate(() => {
      return JSON.parse(document.querySelector('body')!.innerText);
    });

    const outcomes = data.data.outcomes;
    await browser.close();
    return outcomes;
  } catch (e) {
    console.error(e);
  }
};
