import { join } from 'path';
import { Configuration } from 'puppeteer';

const puppeteerConfig: Configuration = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  executablePath: process.env.CHROME_EXECUTABLE_PATH,
};

export default puppeteerConfig;
