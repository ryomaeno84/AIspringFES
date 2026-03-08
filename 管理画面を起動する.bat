@echo off
chcp 65001 > nul
setlocal
pushd "%~dp0"

echo ============================================================
echo   AISpringFES 2026 Admin Tool Launcher
echo ============================================================
echo.
echo サーバーを起動しています...
echo 3秒後にブラウザで管理画面が自動的に開きます。
echo.
echo 【注意】
echo 作業中は、このウィンドウを閉じないでください。
echo 閉じると、記事の保存ができなくなります。
echo 作業が終わったら、このウィンドウを閉じて終了です。
echo.
echo ------------------------------------------------------------
echo.

start /b "" powershell -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Start-Sleep -s 3; Start-Process 'http://localhost:3000/admin/index.html'"

node server.js

if %ERRORLEVEL% neq 0 (
    echo.
    echo ------------------------------------------------------------
    echo 【エラー】 サーバーの起動に失敗しました。
    echo Node.jsがインストールされているか確認してください。
    echo.
    pause
)

popd
endlocal
