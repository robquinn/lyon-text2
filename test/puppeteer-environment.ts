// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

import { promises } from 'fs';
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer';
import NodeEnvironment from 'jest-environment-node';

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = await promises.readFile(
      path.join(DIR, 'wsEndpoint'),
      'utf8'
    );
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to puppeteer
    this.global.__BROWSER_GLOBAL__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = PuppeteerEnvironment;
