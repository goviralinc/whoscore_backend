import puppeteer, { Page, Browser } from 'puppeteer';
import puppeteerConfig from 'puppeteer.config';

interface Event {
  startDate: string;
  oddType: string;
  event: string;
  subEvent: string;
  odd: string;
}

interface Details {
  amount: string;
}

interface BetData {
  details: Details[];
  events: Event[];
  totOdds: string;
  originalPotentialWinning: string;
  betType: number;
}

interface BetInformation {
  type: 'single' | 'multiple';
  totalStake: string;
  totalOdds: string;
  potentialWin: string;
}

interface GamePlayed {
  date: string;
  oddType: string;
  type: string;
  time: string;
  hometeam: string;
  awayteam: string;
  odds: string;
}

interface BetInfo {
  bets: GamePlayed[];
  info: BetInformation;
}

function convertBetData(data: BetData): BetInfo {
  const { details, events, totOdds, originalPotentialWinning, betType } = data;
  const betInfo: BetInfo = {
    bets: [],
    info: { type: 'single', totalStake: '', totalOdds: '', potentialWin: '' },
  };

  const type = betType > 1 ? 'multiple' : 'single';

  const betInformation: BetInformation = {
    type: type,
    totalStake: details[0].amount,
    totalOdds: totOdds,
    potentialWin: originalPotentialWinning,
  };

  const gamePlayed: GamePlayed[] = events.map((event) => ({
    date: event.startDate,
    oddType: event.oddType,
    type: `${event.event} - ${event.subEvent}`,
    time: new Date(event.startDate).toLocaleTimeString('en-GB'),
    hometeam: event.subEvent.split(' - ')[0],
    awayteam: event.subEvent.split(' - ')[1],
    odds: event.odd,
  }));

  betInfo.bets = gamePlayed;
  betInfo.info = betInformation;

  return betInfo;
}

export const crawlBet9jaInfo = async (ticketId: string): Promise<BetInfo> => {
  const api_url = `https://coupon.bet9ja.com/desktop/feapi/CouponAjax/GetCouponDetails?CID=${ticketId}&caller=checkCoupon&v_cache_version=1.260.2.179`;
  const browser: Browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox'],
    executablePath: puppeteerConfig.executablePath,
  });

  const page: Page = await browser.newPage();
  await page.goto(api_url, { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    return JSON.parse(
      (document.querySelector('body') as HTMLElement).innerText,
    );
  });

  const betInfo = convertBetData(data.D);
  console.log(betInfo);

  await browser.close();
  return betInfo;
};
