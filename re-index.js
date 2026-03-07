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

        // 現在の「配列の順序」は最新が上(インデックス0)になっていると仮定
        // 作成日時が古い順にするため、一度配列を逆順にしてから日付でソートする
        const news = [...data.news].reverse();

        // 日付でソート (YYYY.MM.DD)
        news.sort((a, b) => {
            const dateA = a.date.split('.').join('');
            const dateB = b.date.split('.').join('');
            if (dateA !== dateB) {
                return dateA - dateB;
            }
            // 日付が同じ場合は、元の作成順(逆順にしたので古い方が先)を維持
            return 0;
        });

        // 新しいIDを割り当て (1から連番)
        news.forEach((item, index) => {
            item.id = index + 1;
        });

        // サイトの表示順(最新が上)に戻すために、再度逆順にして保存
        data.news = news.reverse();

        const fileHeader = `/**\n * AISpringFES 2026 コンテンツデータ\n * ローカル(file://)でも動作するようにグローバル変数APP_DATAに格納します。\n */\n\nwindow.APP_DATA = `;
        const jsContent = fileHeader + JSON.stringify(data, null, 4) + ';\n';

        fs.writeFileSync(DATA_FILE, jsContent, 'utf-8');
        console.log('Successfully re-indexed news items.');
    } catch (error) {
        console.error('Error:', error);
    }
}

reIndexNews();
