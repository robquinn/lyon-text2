import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import path from 'path';
import * as dotenv from 'dotenv';
import { exec } from 'child_process';
import openAddon from './utils/open-addon';

dotenv.config();

const isExtended = `${process.env.IS_EXTENDED as string}` === 'true';

type ToMatchImageSnapshotType = () => { message: () => string; pass: boolean };

const toMatchImageSnapshot: ToMatchImageSnapshotType =
  configureToMatchImageSnapshot({
    failureThreshold: 0.04,
    failureThresholdType: 'percent',
    customDiffConfig: {
      threshold: 0.1,
    },
    blur: 2,
    allowSizeMismatch: true,
  }) as ToMatchImageSnapshotType;
expect.extend({ toMatchImageSnapshot });
jest.setTimeout(180000);

const srcTestFile = path.join(__dirname, '../src/client/dialog/root/App.tsx');

const webpackDevServerReady = async (process) => {
  console.log('Waiting for Webpack Dev Server to finish loading...');
  return new Promise<void>((resolve) => {
    process.stdout.on('data', (data) => {
      if (data.includes('CLIENT - Dialog')) {
        resolve();
      }
    });
  });
};

describe(`Local setup ${isExtended ? '*extended*' : ''}`, () => {
  let page;
  let process;
  const containerSelector = isExtended ? '.script-app-dialog' : 'body';

  beforeAll(async () => {
    process = exec('npm run serve');
    page = await global.__BROWSER_GLOBAL__.newPage();

    await page.setViewport({
      width: 900,
      height: 900,
      deviceScaleFactor: 1,
    });

    await webpackDevServerReady(process);

    if (isExtended) {
      await openAddon(page);
    } else {
      await page.goto('https://localhost:3000/dialog-impl.html');
      await page.waitForTimeout(3000);
    }
  });

  afterAll(() => {
    console.log('Closing process.');
    process.kill();
  });

  it('should load dialog example', async () => {
    const container = await page.$(containerSelector);
    const image = await container.screenshot();
    expect(image).toMatchSnapshot();
  });

  it('should modify dialog title example', async () => {
    const data = await fs.promises.readFile(srcTestFile, 'utf8');
    const result = data.replace('Text Message Form', 'Testing Title');
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const container = await page.$(containerSelector);
    const image = await container.screenshot();
    expect(image).toMatchSnapshot();
  });

  it('should modify dialog title example back to original', async () => {
    const data = await fs.promises.readFile(srcTestFile, 'utf8');
    const result = data.replace('Testing Title', 'Text Message Form');
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const container = await page.$(containerSelector);
    const image = await container.screenshot();
    expect(image).toMatchSnapshot();
  });
});
