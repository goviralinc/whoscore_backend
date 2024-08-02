import puppeteer, { Browser, Page } from 'puppeteer';

// Define the structure of the result if needed
type CrawlerResult = [
  string, // ticketId
  string | null, // totalGames
  number, // potentialOdds
  string, // potentialWin
  string | null, // totalStake
];

export const crawlBetkingTicket = async (
  ticketId: string,
): Promise<CrawlerResult> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox'],
  });
  const page: Page = await browser.newPage();
  await page.goto('https://www.betking.com/sports/s');

  try {
    // Type the booking code
    await page.type('div input[placeholder="Booking Code..."]', ticketId);

    // Click the button
    await page.click('#btnLoadBookedCoupon');

    // Wait for the coupon content to be visible
    await page.waitForSelector('#couponContent');
  } catch (e) {
    console.error(e);
  }

  // Extract the data
  const totalGames = await page.evaluate(() => {
    const element = document.querySelector('.selections-counter');
    return element ? element.textContent : null;
  });

  const totalStake = await page.evaluate(() => {
    const element = document.querySelector('div input[id="txtAmount"]');
    return element ? (element as HTMLInputElement).value : null;
  });

  const totalDivs = await page.evaluate(() => {
    const container = document.querySelector('.totals-container');
    if (container) {
      const divs = container.querySelectorAll('div');
      return divs.length > 1 ? divs[1].textContent : null;
    }
    return null;
  });

  const potentialOdds: number = totalDivs
    ? Number(totalDivs.replace(/\D/g, '')) / 100
    : 0;
  const potentialStake = totalStake ? parseFloat(totalStake) : 0;
  const potentialWin: string = (potentialOdds * potentialStake).toFixed(2);

  const result: CrawlerResult = [
    ticketId,
    totalGames,
    potentialOdds,
    potentialWin,
    totalStake,
  ];

  await browser.close();
  return result;
};
