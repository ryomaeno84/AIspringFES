@echo off
setlocal
pushd "%~dp0"

:: 文字化け対策 (UTF-8)
chcp 65001 > nul

echo ============================================================
echo   AISpringFES 2026 管理ツール 起動システム
echo ============================================================
echo.
echo 今からサーバーを起動します。
echo 3秒ほどで自動的に管理画面（ブラウザ）が開きます。
echo.
echo 【注意】 
echo 作業中は、この黒いウィンドウを閉じないでください。
echo 閉じると、文字の保存ができなくなります。
echo 作業が終わったら、このウィンドウを閉じてOKです。
echo.
echo ------------------------------------------------------------
echo.

:: ブラウザを数秒後に開く予約 (PowerShellを使用)
start /b "" powershell -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Start-Sleep -s 3; Start-Process 'http://localhost:3000/admin/index.html'"

:: サーバー本体の起動
node server.js

if %ERRORLEVEL% neq 0 (
    echo.
    echo ------------------------------------------------------------
    echo 【エラー】 サーバーの起動に失敗しました。
    echo node.js がインストールされているか確認してください。
    echo.
    pause
)

popd
endlocal
