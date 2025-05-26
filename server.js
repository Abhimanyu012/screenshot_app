const express = require('express');
const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Screenshot endpoint using Playwright
app.get('/screenshot', async (req, res) => {
  let browser;
  try {
    browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    // Load the HTML file directly from disk for reliability in cloud environments
    await page.goto('file://' + path.join(__dirname, 'index.html'));
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
    console.error('Screenshot error:', err); // Log full error to console
    res.status(500).send('Failed to take screenshot: ' + err.message);
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
