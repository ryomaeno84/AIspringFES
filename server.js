const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'content.js');

app.use(bodyParser.json());
// Serve static files (including the main site and the admin panel)
app.use(express.static(__dirname));

// Function to extract and parse data from content.js
function readData() {
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        // Extract the JSON part from window.APP_DATA = { ... };
        const jsonMatch = fileContent.match(/window\.APP_DATA\s*=\s*(\{[\s\S]*?\})\s*;/);

        if (jsonMatch && jsonMatch[1]) {
            // Evaluates the string representation of the object literal into an actual object
            // Use eval cautiously, but since we control content.js it's acceptable for this local admin tool
            let data;
            // Safer evaluation
            const evalContent = `(${jsonMatch[1]})`;
            data = eval(evalContent);
            return data;
        }
        return { news: [], artists: [], guideline: '' };
    } catch (error) {
        console.error('Error reading data file:', error);
        return { news: [], artists: [], guideline: '' };
    }
}

// Function to write back data into content.js
function writeData(data) {
    try {
        // We preserve the general structure of the file
        const fileHeader = `/**\n * AISpringFES 2026 コンテンツデータ\n * ローカル(file://)でも動作するようにグローバル変数APP_DATAに格納します。\n */\n\nwindow.APP_DATA = `;

        // Convert the updated object back to string representation
        const jsContent = fileHeader + JSON.stringify(data, null, 4) + ';\n';

        fs.writeFileSync(DATA_FILE, jsContent, 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
}

// API: Get current news
app.get('/api/news', (req, res) => {
    const data = readData();
    res.json(data.news || []);
});

// API: Save news (add, update status/visibility)
app.post('/api/news', (req, res) => {
    const newItems = req.body; // Expecting an array of news items

    // Validate input basic structure
    if (!Array.isArray(newItems)) {
        return res.status(400).json({ success: false, message: 'Invalid data format' });
    }

    const fullData = readData();
    fullData.news = newItems; // Overwrite the news array entirely

    const success = writeData(fullData);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, message: 'Failed to write data' });
    }
});

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🤖 AIspringFES Admin Server is running!`);
    console.log(`▶ Admin Panel: http://localhost:${PORT}/admin/index.html`);
    console.log(`▶ Main Site  : http://localhost:${PORT}/index.html`);
    console.log(`========================================`);
});
