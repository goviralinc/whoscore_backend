import puppeteer from 'puppeteer';
import puppeteerConfig from 'puppeteer.config';

interface Bet {
  hometeam: string;
  awayteam: string;
  odds: string;
  date: string;
  oddType: string;
}

interface BetInformation {
  totalOdds: string;
  totalStake: string;
  potentialWin: string;
  type: string;
}

interface BetSlipData {
  bets: Bet[];
  info: BetInformation;
  errorMessage?: string;
}

const delay = (time: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const crawlBetwayInfo = async (betCode: string): Promise<BetSlipData> => {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox'],
    executablePath: puppeteerConfig.executablePath,
  });
  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to Betway Nigeria
  await page.goto('https://www.betway.com.ng/', { waitUntil: 'networkidle2' });
  console.log(1);
  // Wait for the page to load completely
  //await page.waitForTimeout(3000); // Wait a bit for any dynamic content

  // Close the banner if it exists
  const bannerSelector = 'a[data-dismiss="modal"][toast-cta="close"] img';
  const closeModalBtn = await page.$(bannerSelector);
  if (closeModalBtn !== null) {
    await closeModalBtn.click();
    //await page.click(bannerSelector);
    console.log('Banner closed');
  }

  await page.waitForNetworkIdle();
  const headerBtnSelector = 'div[data-translate-key="Betslip"]';
  // Wait for the div to be visible
  const headerBtn = await page.waitForSelector(headerBtnSelector);

  // Click on the div
  await headerBtn.click();

  // Wait for the page to load completely
  await page.waitForSelector('input[placeholder="Booking Code"]');

  // Enter the Bet Code
  await page.type('input[placeholder="Booking Code"]', betCode);

  // Click the search button
  await page.click('span[id="searchIconBetslip"]');

  // Explicitly wait for a given timeout to ensure betslip is fully loaded
  await delay(5000);

  // Check for the presence of an error message
  const errorSelector = 'span[data-translate-key="CodeIsExpiredOrInvalid"]';

  console.log('here');
  const errorMessage = await page.$eval(errorSelector, (el) =>
    el.textContent.trim(),
  );
  console.log(errorMessage);
  if (errorMessage.includes('expired or invalid')) {
    console.error('Error detected: ' + errorMessage);
    await browser.close();
    return {
      bets: [],
      info: {
        totalOdds: '',
        totalStake: '',
        potentialWin: '',
        type: '',
      },
      errorMessage: errorMessage,
    };
  }

  // Wait for the bet slip information to load
  await page.waitForSelector('#betslip-list');

  // Wait for the bet details to be loaded and visible on the page
  await page.waitForSelector('li.SelectedOutcomeForBetslip');

  // Scrape the bet slip information
  const betSlipData: BetSlipData = await page.evaluate(() => {
    const betSlipElements = document.querySelectorAll(
      'li.SelectedOutcomeForBetslip',
    );
    const betslip: Bet[] = [];
    const betsInfo: BetInformation = {
      totalOdds: '',
      totalStake: '',
      potentialWin: '',
      type: '',
    };

    betSlipElements.forEach((betElement) => {
      const teamElement = betElement.querySelector(
        '.outcomeRow-Info',
      ) as HTMLElement;
      const oddsElement = betElement.querySelector(
        '.betslipPriceDecimal',
      ) as HTMLElement;
      const matchDateElement = betElement.querySelector(
        '.label__league_title',
      ) as HTMLElement;
      const labelElement = betElement.querySelector(
        'label[data-translate-set="MarketTypes"]',
      ) as HTMLElement;

      const teamString = teamElement?.textContent?.trim() || '';
      const [homeTeam, awayTeam] = teamString.split(' v ');
      const odds = oddsElement?.textContent?.trim() || '';
      const matchDate = matchDateElement?.textContent?.trim() || '';
      const labelText = labelElement?.textContent?.trim() || 'Not found';

      betslip.push({
        hometeam: homeTeam.trim(),
        awayteam: awayTeam.trim(),
        odds: odds,
        date: matchDate,
        oddType: labelText,
      });
    });

    const totalOddsElement = document.querySelector(
      '#betslip-totalpricedecimal',
    ) as HTMLElement;
    const totalOdds = totalOddsElement?.textContent?.trim() || '';
    const inputElement = document.querySelector(
      '#wagerAmount',
    ) as HTMLInputElement;
    const totalStake = inputElement?.value || '';
    const spanElement = document.querySelector(
      '#potentialReturnWithStretchVal',
    ) as HTMLElement;
    const potentialWin = spanElement?.textContent?.trim() || '';

    let betType =
      document.querySelector('#betslip-count')?.textContent?.trim() || '';
    if (Number(betType) > 1) {
      betType = 'multiple';
    } else {
      betType = 'single';
    }

    betsInfo.totalOdds = totalOdds;
    betsInfo.totalStake = totalStake;
    betsInfo.potentialWin = potentialWin;
    betsInfo.type = betType;

    return {
      bets: betslip,
      info: betsInfo,
    };
  });

  // Close the browser
  await browser.close();

  return betSlipData;
};

export default crawlBetwayInfo;
