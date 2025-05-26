const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Screenshot endpoint
app.get('/screenshot', async (req, res) => {
  const url = `http://localhost:${PORT}`;
  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    // Only screenshot the infographic container
    const element = await page.$('.infographic-container');
    let screenshotBuffer;
    if (element) {
      screenshotBuffer = await element.screenshot({ type: 'png' });
    } else {
      screenshotBuffer = await page.screenshot({ type: 'png', fullPage: true });
    }
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="infographic-screenshot.png"');
    res.send(screenshotBuffer);
  } catch (err) {
    res.status(500).send('Failed to take screenshot: ' + err.message);
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
