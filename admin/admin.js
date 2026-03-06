let newsData = [];
let currentIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();

    document.getElementById('btn-new').addEventListener('click', createNew);
    document.getElementById('btn-save-draft').addEventListener('click', () => saveNews('hidden'));
    document.getElementById('btn-publish').addEventListener('click', () => saveNews('public'));

    // プレビュー機能
    document.getElementById('btn-preview').addEventListener('click', showPreview);
    document.getElementById('btn-close-preview').addEventListener('click', () => {
        document.getElementById('preview-modal').classList.add('hidden');
    });

    // GitHub反映機能
    document.getElementById('btn-deploy').addEventListener('click', deployToGitHub);
});

async function deployToGitHub() {
    const isConfirm = confirm('変更内容がユーザーに見える形で公開されますがよろしいですか');
    if (!isConfirm) return;

    const statusEl = document.getElementById('deploy-status');
    statusEl.textContent = '🔄 実行中...';
    statusEl.style.color = 'var(--primary-color)';
    statusEl.classList.remove('hidden');

    try {
        const response = await fetch('/api/deploy', { method: 'POST' });
        const result = await response.json();

        if (result.success) {
            statusEl.textContent = '✔ 完了しました';
            statusEl.style.color = 'var(--success-color)';
        } else {
            statusEl.textContent = '❌ エラー: ' + result.message;
            statusEl.style.color = 'var(--danger-color)';
        }
    } catch (e) {
        console.error(e);
        statusEl.textContent = '❌ 通信エラー';
        statusEl.style.color = 'var(--danger-color)';
    }

    setTimeout(() => {
        statusEl.classList.add('hidden');
    }, 5000);
}

async function fetchNews() {
    try {
        const response = await fetch('/api/news');
        newsData = await response.json();

        // Ensure every item has a status (default to public for existing ones)
        newsData.forEach(item => {
            if (!item.status) item.status = 'public';
        });

        renderList();
        if (newsData.length > 0) {
            selectItem(0);
        } else {
            createNew();
        }
    } catch (e) {
        console.error('Failed to load news', e);
    }
}

function renderList() {
    const list = document.getElementById('news-list');
    list.innerHTML = '';

    newsData.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `news-list-item ${index === currentIndex ? 'selected' : ''}`;

        // フォーマットされたID (01, 02...)
        const displayId = String(item.id).padStart(2, '0');
        const statusClass = item.status === 'public' ? 'status-public' : 'status-hidden';
        const statusText = item.status === 'public' ? '公開中' : '非表示（下書き）';

        li.innerHTML = `
            <div class="item-id">ID: ${displayId} | ${item.date}</div>
            <div class="item-title">${item.title}</div>
            <div class="item-status ${statusClass}">${statusText}</div>
        `;

        li.addEventListener('click', () => selectItem(index));
        list.appendChild(li);
    });
}

function selectItem(index) {
    currentIndex = index;
    renderList();

    const item = newsData[index];
    document.getElementById('editor-title').textContent = `記事の編集 (ID: ${String(item.id).padStart(2, '0')})`;
    document.getElementById('news-id').value = index; // Array index
    document.getElementById('news-number-id').value = item.id;
    document.getElementById('news-date').value = item.date;
    document.getElementById('news-title').value = item.title;
    document.getElementById('news-content').value = item.content;

    hideStatusMessage();
}

function createNew() {
    currentIndex = -1;
    renderList();

    // 採番 (最大ID + 1)
    const maxId = newsData.reduce((max, item) => Math.max(max, item.id), 0);
    const newId = maxId + 1;

    // 今日の日付 (YYYY.MM.DD)
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    document.getElementById('editor-title').textContent = `新規追加 (ID: ${String(newId).padStart(2, '0')})`;
    document.getElementById('news-id').value = 'new';
    document.getElementById('news-number-id').value = newId;
    document.getElementById('news-date').value = dateStr;
    document.getElementById('news-title').value = '';
    document.getElementById('news-content').value = '';

    hideStatusMessage();
}

// URLをaタグに変換するヘルパー
function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

function showPreview() {
    const title = document.getElementById('news-title').value;
    const date = document.getElementById('news-date').value;
    const rawContent = document.getElementById('news-content').value;

    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-date').textContent = date;

    // 改行を <br> に、URLをリンクに
    let htmlContent = linkify(rawContent).replace(/\n/g, '<br>');
    document.getElementById('preview-content').innerHTML = htmlContent;

    document.getElementById('preview-modal').classList.remove('hidden');
}

async function saveNews(targetStatus) {
    const indexStr = document.getElementById('news-id').value;
    const numId = parseInt(document.getElementById('news-number-id').value);

    const newItem = {
        id: numId,
        date: document.getElementById('news-date').value,
        title: document.getElementById('news-title').value,
        content: document.getElementById('news-content').value,
        status: targetStatus
    };

    if (indexStr === 'new') {
        // 新規追加 (先頭に追加)
        newsData.unshift(newItem);
        currentIndex = 0;
    } else {
        // 更新
        newsData[parseInt(indexStr)] = newItem;
    }

    try {
        const response = await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newsData)
        });

        const result = await response.json();
        if (result.success) {
            renderList();
            showStatusMessage('✔ 保存しました');
        } else {
            alert('保存に失敗しました。');
        }
    } catch (e) {
        console.error(e);
        alert('通信エラーが発生しました。');
    }
}

function showStatusMessage(msg) {
    const el = document.getElementById('save-status');
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(hideStatusMessage, 3000);
}

function hideStatusMessage() {
    document.getElementById('save-status').classList.add('hidden');
}
