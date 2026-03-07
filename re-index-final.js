const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'content.js');

function reIndexNews() {
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const jsonMatch = fileContent.match(/window\.APP_DATA\s*=\s*(\{[\s\S]*?\})\s*;/);

        if (!jsonMatch) {
            console.error('Could not find APP_DATA');
            return;
        }

        let data = eval(`(${jsonMatch[1]})`);

        // 不完全な日付の修正 (Ushizaruさんの紹介記事。4thが21日、6thが26日なので24日に設定)
        data.news.forEach(item => {
            if (item.date === '2026.02.') {
                item.date = '2026.02.24';
            }
        });

        // 現在の「配列の順序」は新しいものが上
        // 作成日時を考慮するため、配列を一旦逆順にする
        const news = [...data.news].reverse();

        // 日付でソート (YYYY.MM.DD形式を考慮した堅牢なソート)
        news.sort((a, b) => {
            const dateA = a.date.split('.').map(s => s.padStart(2, '0')).join('');
            const dateB = b.date.split('.').map(s => s.padStart(2, '0')).join('');
            return dateA.localeCompare(dateB);
        });

        // IDを1から連番で再割り当て
        news.forEach((item, index) => {
            item.id = index + 1;
        });

        // 保存用に最新が上になるように戻す
        data.news = news.reverse();

        const fileHeader = `/**\n * AISpringFES 2026 コンテンツデータ\n * ローカル(file://)でも動作するようにグローバル変数APP_DATAに格納します。\n */\n\nwindow.APP_DATA = `;
        const jsContent = fileHeader + JSON.stringify(data, null, 4) + ';\n';

        fs.writeFileSync(DATA_FILE, jsContent, 'utf-8');
        console.log('Successfully re-indexed news items with fixed dates.');
    } catch (error) {
        console.error('Error:', error);
    }
}

reIndexNews();
