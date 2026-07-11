# 📚 バスケットボール学習アプリ

スマートフォンで読み進められるインタラクティブなバスケットボール学習アプリケーション。ブックマーク、メモ、マーカー機能を備え、複数の教科書を横断的に学習できます。

## 🎯 主な機能

### 📖 読書体験
- **横書き最適化UI**: 教科書ページを大きく表示
- **スワイプナビゲーション**: 左右スワイプでページ送り
- **キーボード操作**: 矢印キーでのページ移動
- **プログレスバー**: 進捗状況をリアルタイム表示

### 🔖 学習ツール
- **ブックマーク**: 重要なページを素早く保存・呼び出し
- **メモ機能**: ページごとに学習メモを記録
- **マーカー（ハイライト）**: 4色のハイライト機能
  - 黄色（注目）
  - ピンク（重要）
  - 青色（参考）
  - 緑色（応用）

### 🔍 検索機能
- 8冊の教科書を横断的に検索
- 検索結果から直接ページへジャンプ
- リアルタイム検索

### 💾 自動保存
- ブックマーク、メモ、ハイライトは自動保存
- ローカルストレージを使用
- オフラインでの読書も可能

### 📱 モバイル最適化
- スマートフォン・タブレット対応
- タッチジェスチャー対応
- レスポンシブデザイン

## 🚀 開始方法

### 必要な環境
- Node.js 16.0 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/basketball-learning-app.git
cd basketball-learning-app

# 依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### ビルド

```bash
npm run build
```

成果物は `dist/` ディレクトリに出力されます。

### GitHub Pages にデプロイ

```bash
npm run deploy
```

※ 事前に `package.json` の `homepage` フィールドを自分のリポジトリに変更してください。

## 📁 プロジェクト構成

```
basketball-learning-app/
├── public/
│   └── images/              # 教科書ページ画像（90枚）
├── src/
│   ├── components/          # UIコンポーネント
│   │   ├── PageDisplay.tsx   # ページ表示
│   │   ├── PageControls.tsx  # ナビゲーション
│   │   └── Sidebar.tsx       # サイドバーツール
│   ├── containers/          # ページコンテナ
│   │   ├── BookSelector.tsx  # 教科書選択
│   │   ├── Navigation.tsx    # ナビゲーションバー
│   │   └── PageViewer.tsx    # ページビューア
│   ├── styles/              # グローバルスタイル
│   ├── store.ts             # 状態管理（Zustand）
│   ├── types.ts             # TypeScript型定義
│   ├── App.tsx              # メインアプリ
│   └── main.tsx             # エントリーポイント
├── index.html               # HTMLテンプレート
├── package.json
├── tsconfig.json
└── vite.config.ts          # Vite設定
```

## 🎨 デザイン

### カラーパレット
- **プライマリ**: `#FF6600`（オレンジ）
- **セカンダリ**: `#1F1F1F`（暗灰色）
- **ハイライト色**:
  - 黄色: `#FFD93D`
  - ピンク: `#FF6B9D`
  - 青色: `#4ECDC4`
  - 緑色: `#95E1D3`

### フォント
- **本体**: システムフォント（-apple-system, BlinkMacSystemFont など）
- **タイプスケール**: 12px（XS）〜 28px（3XL）

## 📊 技術スタック

- **フロントエンド**: React 18
- **言語**: TypeScript
- **状態管理**: Zustand
- **ビルドツール**: Vite
- **スタイリング**: CSS 3（CSS変数）
- **デプロイ**: GitHub Pages

## 🔧 カスタマイズ

### 教科書の追加

`src/App.tsx` の `MOCK_TEXTBOOKS` 配列に新しい教科書を追加します：

```typescript
{
  id: 'basketball-102',
  title: 'バスケットボール技術論中級編',
  author: '著者名',
  totalPages: 120,
  imageList: Array.from({ length: 120 }, (_, i) => `/images/book2/page-${i + 1}.jpg`),
  color: '#4ECDC4'
}
```

### ページデータの設定

`src/App.tsx` の `MOCK_PAGES` でページメタデータを定義：

```typescript
{
  id: 'page-1',
  bookId: 'basketball-101',
  pageNumber: 1,
  imageUrl: '/images/page-1.jpg',
  text: 'ページのテキスト内容...',
  chapter: 'Introduction',
  section: 'Getting Started'
}
```

## 📱 ブラウザ対応

- Chrome / Edge（最新2版）
- Firefox（最新2版）
- Safari iOS 14+
- Samsung Internet

## 🎓 使用方法

1. **教科書を選択**: スタート画面から学習したい教科書を選択
2. **ページを移動**: 
   - スワイプ、矢印キー、またはボタンでページ移動
   - ページ番号を直接入力して移動可能
3. **ブックマーク**: 重要なページはブックマークアイコンをタップ
4. **メモを追加**: メッセージアイコンで学習メモを記録
5. **マーカーを引く**: ハイライターアイコンで4色のマーカーを使用
6. **検索**: 虫眼鏡アイコンで全教科書を横断検索

## 🔐 プライバシー

- すべてのデータはブラウザのローカルストレージに保存
- サーバーへの送信なし
- 完全なプライベート学習環境

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

## 🤝 貢献

プルリクエストは大歓迎です。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📧 サポート

問題が発生した場合は、[Issues](https://github.com/yourusername/basketball-learning-app/issues) でお知らせください。

---

**作成日**: 2026年7月  
**最終更新**: 2026年7月  
**バージョン**: 1.0.0
