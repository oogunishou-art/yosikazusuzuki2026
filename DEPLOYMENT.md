# GitHub Pages へのデプロイ手順

このドキュメントでは、バスケットボール教科書学習アプリをGitHub Pagesで公開するための手順を説明します。

## 📋 前提条件

- GitHubアカウント（無料でOK）
- Gitコマンドライン（またはGitHub Desktop）
- `https://oogunishou-art.github.io/` の組織ページ設定済み

---

## 🚀 デプロイ手順

### ステップ 1: リポジトリの準備

```bash
# 1. 新しいリポジトリを作成（または既存リポジトリを使用）
# GitHub上で: https://github.com/oogunishou-art/yosikazusuzuki2026

# 2. ローカルに clone
git clone https://github.com/oogunishou-art/yosikazusuzuki2026.git
cd yosikazusuzuki2026
```

### ステップ 2: ファイルをコピー

以下のファイル・フォルダをリポジトリディレクトリにコピーします：

```
yosikazusuzuki2026/
├── index.html           ← アプリケーション本体
├── README.md            ← 説明書
├── DEPLOYMENT.md        ← このファイル
├── _config.yml          ← GitHub Pages設定
└── images/              ← 90ページ分の画像
    ├── page-1.jpg
    ├── page-2.jpg
    └── ... page-90.jpg
```

### ステップ 3: Git に追加してコミット

```bash
# すべてのファイルをステージング
git add .

# コミットメッセージを付けてコミット
git commit -m "Add basketball textbook learning app v1.0"

# GitHub にプッシュ
git push origin main
```

### ステップ 4: GitHub Pages の設定

1. GitHub リポジトリ → **Settings** を開く
2. 左メニューから **Pages** を選択
3. **Source** を以下のように設定：
   - Branch: `main` 
   - Folder: `/ (root)`
4. **Save** をクリック

5. 数分待つと、下記URLでアプリが公開されます：
   ```
   https://oogunishou-art.github.io/yosikazusuzuki2026/
   ```

---

## 📤 ファイルサイズについて

- **HTML**: 約 20KB（軽量）
- **CSS + JavaScript**: index.htmlに内包
- **画像**: 合計 約16MB（GitHub は100MB/ファイル対応）

**注意**: 初回アクセス時は画像の読み込みに少し時間がかかります。

---

## 🔄 今後の更新方法

新しいページや機能を追加する場合：

```bash
# 1. ローカルでファイル編集
# 例）新しいページ画像を追加
cp new-page-91.jpg images/

# 2. コミット・プッシュ
git add .
git commit -m "Add new page"
git push origin main

# 3. GitHub Pages が自動的に再ビルド（数秒～数分）
```

---

## 🛡️ セキュリティ設定（推奨）

### 1. リポジトリを非公開にする場合

GitHub Pages は通常、公開リポジトリで機能します。  
非公開リポジトリでも Pro メンバーシップでは利用可能です。

### 2. ブランチ保護を設定

```bash
# GitHub リポジトリ Settings → Branches → Add rule
# Branch name pattern: main
# Require pull request reviews: ✓
```

---

## 📊 アナリティクス（オプション）

GitHub Pages の利用状況は下記から確認できます：

1. リポジトリ → **Insights** → **Traffic**
2. ページビュー、訪問者数などが表示されます

---

## ✅ デプロイ後の確認チェックリスト

- [ ] ページ画像が正しく表示されている
- [ ] ブックマーク機能が動作している
- [ ] メモ機能が保存できている
- [ ] キーボードショートカット（←→）が機能している
- [ ] モバイルデバイスでレスポンシブに表示されている
- [ ] 矢印キーでページ遷移できている

---

## 🐛 トラブルシューティング

### 画像が 404 で表示されない

**原因**: `_config.yml` の `baseurl` 設定が不正

**解決法**:
```yaml
# _config.yml
baseurl: /yosikazusuzuki2026  # ← 名前の最後に / がないことを確認
```

### CSS/JSが適用されない

**原因**: ブラウザキャッシュ

**解決法**:
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### デプロイ後に反映されない

**原因**: GitHub Pages のビルド遅延

**確認**:
1. リポジトリ → **Actions** タブで **Deploy** ジョブを確認
2. 緑色の ✓ が表示されるまで待機

---

## 📞 サポート

問題が発生した場合：

1. **GitHub Issues**: リポジトリで Issue を作成
2. **GitHub Pages ドキュメント**: https://pages.github.com/
3. **ブラウザ開発ツール**: F12 キーでコンソール確認

---

## 📚 関連リンク

- [GitHub Pages 公式ドキュメント](https://docs.github.com/en/pages)
- [Jekyll テーマ](https://pages.github.com/themes/)
- [独自ドメインの設定](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**最終更新**: 2026年7月  
**バージョン**: 1.0
