# GitHub Pages へのデプロイメントガイド

このドキュメントでは、バスケットボール学習アプリを GitHub Pages にデプロイする手順を説明します。

## 📋 前提条件

- GitHub アカウント
- Git がインストールされている
- Node.js 16+ がインストールされている

## 🚀 ステップバイステップガイド

### Step 1: GitHub でリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 「+」アイコン → 「New repository」をクリック
3. リポジトリ名を入力: `basketball-learning-app`
4. 「Create repository」をクリック

### Step 2: ローカルリポジトリをセットアップ

```bash
# プロジェクトディレクトリに移動
cd basketball-learning-app

# ローカルGitリポジトリを初期化（既に初期化済みの場合はスキップ）
git init

# リモートリポジトリを追加
git remote add origin https://github.com/yourusername/basketball-learning-app.git

# ブランチ名を設定（GitHubのデフォルトに合わせる）
git branch -M main
```

### Step 3: package.json を編集

`package.json` の以下の部分を編集してください：

```json
{
  "homepage": "https://yourusername.github.io/basketball-learning-app",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/basketball-learning-app.git"
  }
}
```

`yourusername` をあなたの GitHub ユーザー名に置き換えてください。

### Step 4: 初回のコミットとプッシュ

```bash
# すべてのファイルをステージ
git add .

# 初回コミット
git commit -m "Initial commit: Basketball learning app"

# GitHub にプッシュ
git push -u origin main
```

### Step 5: gh-pages ブランチを使用したデプロイ

```bash
# 依存関係をインストール
npm install

# ビルドして GitHub Pages にデプロイ
npm run deploy
```

このコマンドは以下の処理を実行します：
1. アプリをビルド（`dist/` フォルダを生成）
2. `dist/` フォルダの内容を `gh-pages` ブランチにプッシュ

### Step 6: GitHub Pages の設定を確認

1. GitHub のリポジトリページを開く
2. 「Settings」→「Pages」をクリック
3. 「Build and deployment」セクションで以下を確認：
   - Source: 「Deploy from a branch」
   - Branch: 「gh-pages」「/(root)」を選択

しばらくすると、アプリが以下のURLで利用可能になります：
```
https://yourusername.github.io/basketball-learning-app
```

## 🔄 更新方法

アプリを更新した後、以下のコマンドで再デプロイできます：

```bash
# 変更をコミット
git add .
git commit -m "Update: [変更内容を記述]"
git push origin main

# GitHub Pages にデプロイ
npm run deploy
```

## 🚨 トラブルシューティング

### デプロイ後に真っ白なページが表示される

**原因**: ベースパスの設定が間違っている可能性があります

**解決方法**:
1. `vite.config.ts` を確認
2. `base` プロパティが正しく設定されているか確認

```typescript
export default defineConfig({
  // ...
  base: '/basketball-learning-app/',  // ← このパスを確認
})
```

### スタイルが読み込まれていない

**解決方法**:
- キャッシュをクリア（Ctrl+Shift+Delete / Cmd+Shift+Delete）
- ブラウザを再起動してアクセス

### 画像が表示されない

**原因**: 画像パスが正しくない

**解決方法**:
1. `public/images/` に画像が配置されているか確認
2. ファイル名が正確に `page-1.jpg`, `page-2.jpg` 等であるか確認
3. ブラウザの開発者ツール（F12）でコンソールエラーを確認

### gh-pages コマンドが失敗する

```bash
# gh-pages パッケージが正しくインストールされているか確認
npm install --save-dev gh-pages

# SSHキーの設定を確認（HTTPS使用がおすすめ）
git remote -v
```

## 📊 継続的なデプロイメント

GitHub Actions を使用して自動デプロイを設定することもできます。

### GitHub Actions ワークフローの作成

`.github/workflows/deploy.yml` ファイルを作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm install

      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

このワークフローにより、`main` ブランチへのプッシュ時に自動的にビルド・デプロイが実行されます。

## 📱 モバイルでのテスト

デプロイ後、以下の方法でモバイルでテストできます：

1. デプロイされたURLをブラウザで開く
2. スマートフォンで同じURLを開く
3. QRコード生成ツール（例：[QR Code Generator](https://qrcode.withgoogle.com)）を使用してQRコード経由で開く

## 🎯 ベストプラクティス

1. **定期的にテスト**: デプロイ前に常にローカルで確認
2. **バージョニング**: 重要な更新は Git タグを使用してマーク
3. **ドキュメント**: 大きな変更は CHANGELOG.md に記録
4. **バックアップ**: ローカルに開発環境のバックアップを保持

## 📞 サポート

問題が解決しない場合：
- GitHub Issues で質問
- ローカル開発環境での動作確認
- ブラウザの開発者ツールでエラーログを確認

---

**作成日**: 2026年7月
