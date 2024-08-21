import puppeteer, { Page, Browser } from 'puppeteer';
import puppeteerConfig from 'puppeteer.config';

interface Bet {
  betType: string | null;
  hometeam: string | null;
  awayTeam: string | null;
  oddType: string | null;
  odds: string | null;
  status: string | null;
}

interface BetInfo {
  bets: Bet[];
  info: {
    ticketId: string;
    totalStake: string;
    potentialWin: string;
    typeHeader: string;
    noHeader: string;
    stakeHeader: string;
    totalOdds: string | number;
  };
}

console.log(puppeteerConfig.executablePath);

export const crawlSportyInfo = async (betCode: string): Promise<any> => {
  console.log(1);
  const browser: Browser = await puppeteer.launch({
    headless: true,
    slowMo: 25,
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox'],
    executablePath: '/opt/google/chrome/google-chrome',
  });
  console.log(2);
  const page: Page = await browser.newPage();
  // Navigate to SportyBet site
  const url: string = 'https://www.sportybet.com/ng/';
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log(3);
  // Wait for the bet code input field to be available and enter the bet code
  await page.waitForSelector('input.m-input[placeholder="Booking Code"]');
  await page.type('input.m-input[placeholder="Booking Code"]', betCode);
  await page.click('button[type="primary"]');

  await page.waitForSelector('div.m-betslips');
  await page.waitForSelector('.m-list');
  await page.waitForSelector('div.m-list div.m-item');
  await page.waitForSelector('.m-stake');
  await page.waitForSelector('.m-money-wrapper .m-value');
  await page.waitForSelector('.m-label-one-cut-fix + .m-value');
  await page.waitForSelector('.m-plays-title .m-type');

  // Extract information from each m-item within the m-list
  const betslipItems = await page.evaluate((betCode: string) => {
    const items: Bet[] = [];
    const stakeInformation: BetInfo['info'] = {
      ticketId: betCode,
      totalStake: '0',
      potentialWin: '0',
      typeHeader: '',
      noHeader: '',
      stakeHeader: '',
      totalOdds: 'Unavailable',
    };
    let totalOdds: string | number = 'Unavailable';

    // Select all m-item elements
    const itemElements = document.querySelectorAll('.m-list .m-item');

    // Loop through each item and extract relevant information
    itemElements.forEach((item) => {
      const betType =
        (
          item.querySelector('.m-item-play span') as Element
        )?.textContent?.trim() || null;

      const teams =
        (item.querySelector('.m-item-team') as Element)?.textContent?.trim() ||
        null;
      const oddType =
        (
          item.querySelector('.m-item-market') as Element
        )?.textContent?.trim() || null;
      const odds =
        (
          item.querySelector('.m-item-odds span') as Element
        )?.textContent?.trim() || null;
      const status =
        (item.querySelector('.m-text-min') as Element)?.textContent?.trim() ||
        null;

      const [hometeam, awayTeam] = teams
        ? teams.split('v').map((team) => team.trim())
        : [null, null];

      if (/^-?\d+(\.\d+)?$/.test(odds)) {
        if (typeof totalOdds === 'number') {
          totalOdds += parseFloat(odds);
        } else {
          totalOdds = parseFloat(odds);
        }
      } else {
        totalOdds = 'Unavailable';
      }

      items.push({
        betType,
        hometeam,
        awayTeam,
        oddType,
        odds,
        status,
      });
    });

    // Extract the 'Total Stake' value
    stakeInformation.totalStake =
      (
        document.querySelector('.m-money-wrapper .m-value') as Element
      )?.textContent?.trim() || '0';

    // Extract the 'Potential Win' value
    stakeInformation.potentialWin =
      document
        .querySelector('.m-label-one-cut-fix + .m-value')
        ?.textContent.trim() || '0';

    // Extract the 'Type', 'No.', and 'Stake' headers
    stakeInformation.typeHeader =
      (
        document.querySelector('.m-plays-title .m-type') as Element
      )?.textContent?.trim() || '';
    stakeInformation.noHeader =
      (
        document.querySelector('.m-plays-title .m-num') as Element
      )?.textContent?.trim() || '';
    stakeInformation.stakeHeader =
      (
        document.querySelector('.m-plays-title .m-money') as Element
      )?.textContent?.trim() || '';

    stakeInformation.totalOdds = totalOdds;

    return {
      bets: items,
      info: stakeInformation,
    };
  }, betCode);

  await browser.close();
  return betslipItems;
};
