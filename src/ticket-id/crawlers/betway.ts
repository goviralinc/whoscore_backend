import puppeteer, { Browser, Page } from 'puppeteer';

interface BetwayResponse {
  // Define the structure of the response if known, e.g.:
  // someField: string;
  // anotherField: number;
  // For now, we can use any, but it's better to replace with actual types.
  [key: string]: any;
}

export const crawlBetwayTicket = async (
  ticketId: string,
): Promise<BetwayResponse> => {
  const apiUrl = `https://www.betway.com.ng/BookABet/internal/GetClientSideBetslipForBookingCode?bookingCode=${ticketId}`;
  const browser: Browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox'],
  });

  const page: Page = await browser.newPage();
  await page.goto(apiUrl);

  const data: BetwayResponse = await page.evaluate(() => {
    return JSON.parse(
      document.querySelector('body')!.innerText,
    ) as BetwayResponse;
  });

  console.log(data);

  await browser.close();
  return data;
};
