'use strict';

const puppeteer = require('puppeteer');

// Synopsis: $0 http://yourhost:yourport /path/to/screenshot

(async () => {
    // NB: ignoreHTTPSErrors gets us only so far. It still trips over the
    // client certificates in our certs (even when they're optional), or
    // perhaps something else:
    //
    // https://bugs.chromium.org/p/chromium/issues/detail?id=757181
    var url = process.argv[2]+process.argv[3];
    console.log(url);
    const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle'});
    await new Promise(resolve => setTimeout(resolve, 10000)); // sleep 10s
    await page.screenshot({path: 'out.png', fullPage: true});

    browser.close();
})();
