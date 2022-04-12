# microcms-iframe-table

## 機能

- microCMS の外部データ連携を利用して、管理画面からテーブルを入力する

## 技術構成

- React(SPA)

## 利用方法

microCMS の iframe フィールドより、URL を指定することで使用可能です。詳しくは https://blog.microcms.io/iframe-table/ をご覧ください。

### デプロイ済みのサービスを利用

以下 URL を設定してください。

https://microcms-iframe-table.pages.dev

※こちらは予告なく変更や提供停止する可能性がありますので、ご注意ください。

### セルフホスティング

```bash
# パッケージをインストール
$ npm install

# ファイルをビルド
$ npm run build
```

build ディレクトリが作成されるので、そちらをホスティング後、デプロイ先 URL を設定してください。

## 開発方法

```bash
# パッケージをインストール
$ npm install

# 開発サーバーを起動（localhost:3000）
$ npm run start
```

microCMS の iFrame フィールドにて`http://localhost:3000`を指定することでデバッグ可能です。

その場合、管理画面の URL をリファラーで取得できないため、`Editor.jsx`内の`microcmsAdminUrl`に、管理画面の URL を指定してください。

## ライセンス

Apache License 2.0
