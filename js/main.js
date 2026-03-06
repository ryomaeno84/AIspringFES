document.addEventListener('DOMContentLoaded', () => {
    // APP_DATAが読み込まれているか確認
    if (!window.APP_DATA) {
        console.error('APP_DATA not found. Make sure data/content.js is loaded before main.js.');
        return;
    }

    initTabs();
    loadNews();
    loadArtists();
    loadGuidelines();
});

function initTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            btns.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(target);
            if (targetEl) {
                targetEl.classList.add('active');

                // スクロール位置をコンテンツの先頭へ
                const navHeight = document.querySelector('.tabs-nav').offsetHeight;
                const contentTop = targetEl.offsetTop - navHeight - 20;
                window.scrollTo({ top: contentTop, behavior: 'smooth' });
            }
        });
    });
}

function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    window.APP_DATA.news.forEach(news => {
        const li = document.createElement('li');
        li.className = 'news-item';
        li.innerHTML = `
            <div class="news-date">${news.date}</div>
            <div class="news-title">${news.title}</div>
            <div class="news-detail" style="display:none; margin-top:15px; color:#ccc; border-left: 2px solid #d4af37; padding-left: 15px;">
                ${news.content}
            </div>
        `;
        li.addEventListener('click', () => {
            const detail = li.querySelector('.news-detail');
            detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
        });
        container.appendChild(li);
    });
}

function loadArtists() {
    const container = document.getElementById('artist-container');
    if (!container) return;

    window.APP_DATA.artists.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.innerHTML = `
            <img src="assets/images/thumbs/${artist.id}.jpg" alt="${artist.name}" class="artist-thumb">
            <div class="artist-name">${artist.name}</div>
            <a href="${artist.xLink}" target="_blank" class="x-link">X Profile</a>
        `;
        container.appendChild(card);
    });
}

function loadGuidelines() {
    const container = document.getElementById('guideline-text');
    if (!container) return;
    container.textContent = window.APP_DATA.guideline;
}
