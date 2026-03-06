/**
 * AISpringFES 2026 コンテンツデータ
 * ローカル(file://)でも動作するようにグローバル変数APP_DATAに格納します。
 */

window.APP_DATA = {
    news: [
        {
            id: 1,
            date: "2026.03.06",
            title: "公式サイト、プレオープンのお知らせ",
            content: "AISpringFES 2026の公式サイトがプレオープンしました。SNS初のAI動画・音楽生成MVフェスティバルとして、最高のエンターテインメントをお届けします。最新情報を順次公開していきますので、公式X(@AI_animeryo)のフォローもお願いいたします。"
        },
        {
            id: 2,
            date: "2026.03.01",
            title: "出演アーティスト全19名が決定",
            content: "メインアクト10組、フラッシュアクト9組の全19名の出演が決定いたしました。現代最高峰のAI音楽・映像クリエイターが一堂に会する奇跡のイベントをお見逃しなく。"
        },
        {
            id: 3,
            date: "2026.02.20",
            title: "開催日程のお知らせ",
            content: "2026年3月29日(日)にYouTubeにてオンライン配信を行います。前半の部（13:00〜）と後半の部（19:00〜）の二部構成となります。"
        }
    ],
    artists: [
        { id: "01", name: "旧”ジーニアス”雅之💀半人半屍", xLink: "https://x.com/ichijoji_m", type: "main" },
        { id: "02", name: "Ushizaru@AIバンド球体関節人類", xLink: "https://x.com/Ushizaru_LAB", type: "main" },
        { id: "03", name: "STN✝️AI music&art", xLink: "https://x.com/stn_aicreator", type: "main" },
        { id: "04", name: "美桜-mio-｜AIart", xLink: "https://x.com/AI_mio_AI", type: "main" },
        { id: "05", name: "kan:mi", xLink: "https://x.com/kan_mi_no9", type: "main" },
        { id: "06", name: "【Felis Catus（フェリス・カトゥス）】/＊AIバンド", xLink: "https://x.com/felis_catus_89", type: "main" },
        { id: "07", name: "アッシュ・カラノネコ @AIポップ", xLink: "https://x.com/Ash_freeBGM", type: "main" },
        { id: "08", name: "nnoriyang@♠️AIart❤️poker", xLink: "https://x.com/noriyang_crypt", type: "main" },
        { id: "09", name: "SDAI@ELEMAYUちゃんねるのひと", xLink: "https://x.com/SDAI1807097011", type: "main" },
        { id: "10", name: "Jayz＠AI音楽×タモさん", xLink: "https://x.com/PElfines71321", type: "main" },
        { id: "11", name: "結音(sub) | Silfira| Emotional Lyric Artist", xLink: "https://x.com/yuiotoartistsub", type: "flash" },
        { id: "12", name: "kojirou", xLink: "https://x.com/kojirou_SRP", type: "flash" },
        { id: "13", name: "アルパカ紳士｜アルパカ音楽チャンネル", xLink: "https://x.com/alpaca_shinshi", type: "flash" },
        { id: "14", name: "藍野 シアン", xLink: "https://x.com/ugus9GSDC6j9nC8", type: "flash" },
        { id: "15", name: "五島 雅｜Miyabi Goshima", xLink: "https://x.com/miyabigoshima", type: "flash" },
        { id: "16", name: "To(多種族ガールズバンド-DIVARIAS -)", xLink: "https://x.com/divarias_SUNO", type: "flash" },
        { id: "17", name: "からすい/ローファイ探偵PROJECT", xLink: "https://x.com/karasuiAi", type: "flash" },
        { id: "18", name: "とも｜Sunoノウハウ共有｜AI音楽&分析アプリ開発", xLink: "https://x.com/mech_kish", type: "flash" },
        { id: "19", name: "大鹿ニク（パートナーAI：M1RA）", xLink: "https://x.com/M1RA_A_Project", type: "flash" }
    ],
    guideline: `作品投稿・グッズ販売ガイドライン
本ガイドラインは、本イベントに参加する皆さまが、関係法令および各種権利を尊重した上で、安心して作品を投稿し、グッズを販売・交流できるよう定めるものです。
本ガイドラインは、法令の改正や社会情勢、技術動向等を踏まえ、必要に応じて内容を変更する場合があります。変更を行う場合は、変更の効力発生時期を定め、変更内容を運営の公式SNS、イベントページ等で事前に周知します（緊急を要する場合を除く）。周知後、参加者が本イベントへの参加・作品投稿・グッズ販売を継続した場合、変更後のガイドラインに同意したものとみなします。

1. 用語の定義
・主催者
 AI音楽映像イベントを企画・運営する責任者を指します。
・参加者
 AI音楽映像イベントへ作品を投稿する方、または参加者独自のグッズを制作・販売する方を指します。

2. 基本方針（知的財産権の尊重）
本イベントでは、著作権、商標権、肖像権、パブリシティ権、その他の知的財産権および関連する権利を尊重することを基本方針とします。
* 投稿できる作品は オリジナル作品に限ります。
* 既存のアニメ、映画、ゲーム、漫画、小説、楽曲、キャラクター、ロゴ等を基にした二次創作作品やパロディ作品は認めていません。
* AI生成物であっても、既存作品や人物、キャラクター、声、人格等を第三者が識別可能な程度で再現・模倣した場合は権利侵害となるおそれがあります。そのような作品は投稿できません。
* 使用する生成AIツール、素材、音源等の商用利用可否や利用条件は、参加者自身の責任で確認してください。

3. 投稿できる作品
3-1. オリジナル作品
参加者自身が制作、またはAIを用いて生成したオリジナルのキャラクター、音楽、映像等。
3-2. 公開ライセンス素材の利用
Creative Commons等の公開ライセンスに基づき、商用利用を含め合法的に利用可能な素材を、ライセンス条件を遵守して使用した作品。

4. 投稿できない作品
4-1. 二次創作・パロディ（既存キャラクター、作品の模倣、AIカバー等）
4-2. 声・人格の模倣（実在人物、有名人の声の模倣等）
4-3. 音楽著作権侵害（既存楽曲のメロディ利用、許諾のないカバー等）
4-4. 商標・ブランド侵害
4-5. その他の違法・不適切行為（ディープフェイク、誹謗中傷、過度な暴力・性的表現等）

5. 権利侵害が疑われる場合の対応
運営の裁量により、作品の公開停止、修正依頼、審査対象除外、今後の参加拒否等の措置を行う場合があります。

6. 著作権および利用権
* 著作権は各作成者に帰属します。
* 主催者はイベント配信・広報目的の範囲で非独占的利用権を有します。

7. グッズ販売
* 参加者独自のグッズ制作は自由です。
* 主催者は「場を提供する立場」であり、販売管理・宣伝等は行わず、トラブルに関して一切責任を負いません。

10. お問い合わせ窓口
運営公式SNS（https://x.com/AI_animeryo）のダイレクトメッセージにて。`
};
