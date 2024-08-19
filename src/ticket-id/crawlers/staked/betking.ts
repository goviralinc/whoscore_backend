import puppeteer, { Page, Browser } from 'puppeteer';
import puppeteerConfig from 'puppeteer.config';

interface Bet {
  oddType: string;
  hometeam: string;
  awayteam: string;
  time: string;
  odds: string;
}

interface BetInfo {
  bets: Bet[];
  info: {
    date: string | null;
    type: string | null;
    grossWinnings: string | null;
    totalStake: string | null;
    totalOdds: string | null;
    potentialWin: string | null;
  };
}

export const crawlBetKingInfo = async (
  couponCode: string,
): Promise<BetInfo> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox'],
    executablePath: puppeteerConfig.executablePath,
  });
  const page: Page = await browser.newPage();
  const betInfo: BetInfo = {
    bets: [],
    info: {
      date: null,
      type: null,
      grossWinnings: null,
      totalStake: null,
      totalOdds: null,
      potentialWin: null,
    },
  };

  // Construct the URL using the coupon code
  const url: string = `https://m.betking.com/coupon-check/${couponCode}`;

  await page.goto(url, { waitUntil: 'networkidle2' });

  // Wait for the betting information to load
  const betsContainer = await page.waitForSelector('.coupon-details-container');
  if (!betsContainer) {
    throw new Error('Bets container not found');
  }

  const betElements = await page.$$(
    'div.event-row div.ng-tns-c274-4 div.ng-star-inserted',
  );

  const betResponseList: string[] = [];

  for (const bet of betElements) {
    const rawBetDetails = await bet.evaluate(
      (el) => (el as HTMLElement).textContent?.trim() || '',
    );
    betResponseList.push(rawBetDetails);
  }

  console.log(betResponseList);

  // Process the list to group entries
  for (let i = 0; i < betResponseList.length; i += 5) {
    const gamePlayed = betResponseList[i + 1].trim();
    const parts = gamePlayed.split('-');
    const oddType = parts.length > 1 ? parts[1] : gamePlayed;
    const teamsAndTime = betResponseList[i + 3]
      .split('|')
      .map((part) => part.trim());
    const odds = betResponseList[i + 4].trim();

    const teams = teamsAndTime[0].trim();
    const time = teamsAndTime[1].trim();

    // Split teams into home and away teams
    let [hometeam, awayteam] = teams
      .split(/v|\d+-\d+/)
      .map((team) => team.trim());
    awayteam = awayteam.replace('(HT:', '').trim();

    betInfo.bets.push({
      oddType,
      hometeam,
      awayteam,
      time,
      odds,
    });
  }

  // Tabulate and print the data
  console.table(betInfo.bets);

  // Extract the values from the elements
  const extractedData = await page.evaluate(() => {
    // Extract the date value
    const dateElement = document.querySelector(
      'div[data-testid="my-bets-bet-info-content-date-value"]',
    );
    const dateValue = dateElement ? dateElement.textContent?.trim() : null;

    // Extract the bet type value
    const betTypeElement = document.querySelector(
      'div[data-testid="my-bets-bet-info-content-bet-type-value"]',
    );
    const betTypeValue = betTypeElement
      ? betTypeElement.textContent?.trim()
      : null;

    // Extract the gross winnings value
    const winningsElement = document.querySelector(
      'div[data-testid="my-bets-bet-info-content-gross-winnings-value"]',
    );
    const winningsValue = winningsElement
      ? winningsElement.textContent?.trim()
      : null;

    // Extract the stake value
    const stakeElement = document.querySelector(
      'div[data-testid="my-bets-bet-info-content-stake-value"]',
    );
    const stakeValue = stakeElement ? stakeElement.textContent?.trim() : null;

    // Extract the total odds value
    const oddsElement = document.querySelector(
      'div[data-testid="my-bets-bet-info-odds-value"]',
    );
    const oddsValue = oddsElement ? oddsElement.textContent?.trim() : null;

    // Extract the potential win value
    const winElement = document.querySelector(
      'div[data-testid="my-bets-bet-info-content-potentional-win-value"]',
    );
    const winValue = winElement ? winElement.textContent?.trim() : null;

    return {
      date: dateValue,
      type: betTypeValue,
      grossWinnings: winningsValue,
      totalStake: stakeValue,
      totalOdds: oddsValue,
      potentialWin: winValue,
    };
  });

  betInfo.info = extractedData;

  await browser.close();
  return betInfo;
};
