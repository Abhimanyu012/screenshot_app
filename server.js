const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// POST /screenshot { url: "https://example.com" }
app.post('/screenshot', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        // Using ScreenshotAPI.net demo endpoint (no API key required for demo)
        const apiUrl = `https://shot.screenshotapi.net/screenshot?token=demo&url=${encodeURIComponent(url)}&output=image&file_type=png`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to capture screenshot', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Screenshot backend running on http://localhost:${PORT}`);
});
