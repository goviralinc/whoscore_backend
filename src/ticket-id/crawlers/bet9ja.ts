import puppeteer, { Browser, Page } from 'puppeteer';

interface Bet9jaResponse {
  D: any; // Replace 'any' with the actual type if you know the structure of 'D'
}

export const crawlBet9jaTicket = async (ticketId: string): Promise<any> => {
  const apiUrl = `https://coupon.bet9ja.com/desktop/feapi/CouponAjax/GetBookABetCoupon?couponCode=${ticketId}`;
  const browser: Browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox'],
  });

  const page: Page = await browser.newPage();
  await page.goto(apiUrl);

  const data: Bet9jaResponse = await page.evaluate(() => {
    return JSON.parse(
      document.querySelector('body')!.innerText,
    ) as Bet9jaResponse;
  });

  console.log(data.D);

  await browser.close();
  return data.D;
};
