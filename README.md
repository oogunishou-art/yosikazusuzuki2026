# 📚 バスケットボール学習アプリ

スマートフォン最適化の学習アプリケーション

## 📦 ファイル構成

```
your-repository/
├── index.html          ← メインのUIファイル（このファイルだけで動作）
├── data.json           ← 教科書データ（オプション）
└── images/             ← 教科書のページ画像（必須）
    ├── page-1.jpg
    ├── page-2.jpg
    ├── page-3.jpg
    └── ... (page-90.jpg まで)
```

## 🚀 始める方法

### ステップ1: ファイルを GitHub にアップロード

1. GitHub でリポジトリを作成
2. 以下のファイルをアップロード：
   - `index.html`
   - `data.json`
   - `images/` フォルダ（90枚の JPEG 画像）

### ステップ2: GitHub Pages を設定

1. リポジトリの Settings → Pages
2. Source を **main branch** に設定
3. 数分後、以下の URL でアクセス可能：
   ```
   https://yourusername.github.io/repository-name
   ```

### ステップ3: 教科書画像を配置

1. `images/` フォルダを作成
2. 以下のように名前付けして配置：
   - `page-1.jpg`
   - `page-2.jpg`
   - `page-3.jpg`
   - ...
   - `page-90.jpg`

## 🎨 主な機能

- ✅ **大きなページ表示** - 教科書に最適なビューアー
- ✅ **スワイプナビゲーション** - 左右スワイプでページ移動
- ✅ **キーボード操作** - 矢印キーでページ移動
- ✅ **ブックマーク機能** - 重要なページを保存
- ✅ **自動保存** - データはローカルストレージに保存
- ✅ **モバイル最適化** - スマートフォンで完璧に動作

## 📱 操作方法

### ページ移動
- **スワイプ**: 左右にスワイプでページ移動
- **矢印キー**: ← → キーでページ移動
- **ボタン**: ◀ ▶ ボタンでページ移動
- **直接入力**: ページ番号を入力して移動

### 学習機能
- **📌 ブックマーク**: 重要なページをブックマーク
- **📝 メモ**: ページごとにメモを記録
- **✏️ ハイライト**: 重要部分にマーカーを引く

## 🖼️ 画像ファイルの準備方法

### PDFから変換（Linux/Mac）

```bash
# ImageMagick を使用
convert -density 150 input.pdf -quality 85 images/page-%d.jpg

# または ghostscript を使用
gs -q -dNOPAUSE -dBATCH -sDEVICE=jpeg -dJPEGQ=85 \
   -r150x150 -sOutputFile="images/page-%03d.jpg" input.pdf
```

### オンラインツール
- [CloudConvert](https://cloudconvert.com/pdf-to-jpg)
- [ILovePDF](https://www.ilovepdf.com/pdf-to-jpg)

### 画像の仕様
- **形式**: JPEG / PNG
- **推奨サイズ**: 600x800px
- **ファイルサイズ**: 100-300KB/ファイル
- **命名規則**: `page-1.jpg`, `page-2.jpg`, ...

## 💾 データの保存と復元

### ブラウザに保存（自動）
すべてのブックマーク、メモ、ハイライトはブラウザのローカルストレージに自動保存されます。

### 手動バックアップ
```javascript
// ブラウザコンソール（F12で開く）で実行
const backup = localStorage.getItem('basketball_app_state');
console.log(backup);  // コピーして保存
```

### データをリセット
```javascript
// ブラウザコンソールで実行
localStorage.clear();
location.reload();
```

## 🔧 カスタマイズ

### 複数教科書の追加

`index.html` の以下の部分を編集：

```javascript
// === 初期化 ===
async function init() {
    const textbooks = [
        {
            id: 'basketball-101',
            title: 'バスケットボールの教科書１',
            author: '鈴木良和',
            totalPages: 90,
            color: '#FF6600'
        },
        {
            id: 'basketball-201',  // ← 新しい教科書を追加
            title: '中級編',
            author: '著者名',
            totalPages: 120,
            color: '#4ECDC4'
        }
    ];
    // ...
}
```

新しい教科書の画像は `images/book2/` などのフォルダに配置：
```
images/
├── page-1.jpg ~ page-90.jpg       (教科書1)
└── book2/
    ├── page-1.jpg ~ page-120.jpg  (教科書2)
```

### テーマカラーの変更

`index.html` の CSS 変数を編集：

```css
:root {
    --color-primary: #FF6600;        /* メインカラー */
    --color-primary-dark: #E55A00;   /* ダークバージョン */
}
```

## ⚡ パフォーマンス

- **ファイルサイズ**: index.html のみで 50KB
- **読み込み時間**: < 1秒
- **メモリ使用量**: 最小限（10-20MB）
- **対応ブラウザ**: Chrome, Edge, Firefox, Safari iOS 14+

## 🐛 トラブルシューティング

### 画像が表示されない
- `images/page-1.jpg` ... `page-90.jpg` が配置されているか確認
- ファイル名が正確に `page-1.jpg` など（大文字小文字注意）
- ブラウザのコンソール（F12）でエラーを確認

### ブックマークが保存されない
- ブラウザのプライベートモード（シークレットウィンドウ）では保存されません
- 通常のウィンドウで利用してください

### デプロイ後に真っ白
- GitHub Pages の設定を確認
- キャッシュをクリア（Ctrl+Shift+Delete）

## 📞 サポート

問題が発生した場合：
1. ブラウザの開発者ツール（F12）でエラーを確認
2. ファイル構成を確認
3. GitHub Issues で質問

## 📄 ライセンス

MIT License

---

**作成日**: 2026年7月11日  
**バージョン**: 1.0.0
