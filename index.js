'use strict';

const puppeteer = require('puppeteer');

(async () => {
    // NB: ignoreHTTPSErrors gets us only so far. It still trips over the
    // client certificates in our certs (even when they're optional), or
    // perhaps something else:
    //
    // https://bugs.chromium.org/p/chromium/issues/detail?id=757181
    const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
    const page = await browser.newPage();
    await page.goto('http://localhost:8080', {waitUntil: 'networkidle'});
    await page.screenshot({path: 'out.png', fullPage: true});

    browser.close();
})();