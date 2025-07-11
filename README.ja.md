# Turborepo Playground

Turborepo、Bun、TypeScript を使用したモダンなモノレポ設定。複数の Next.js アプリケーションと Cloudflare Workers API を含み、共通パッケージを共有しています。

## 📋 プロジェクト内容

この Turborepo には以下のパッケージとアプリが含まれています：

### アプリケーション

- `apps/api` - Cloudflare Workers 上で動作する Hono API
- `apps/desktop` - デスクトップ向けに最適化された Next.js アプリ
- `apps/mobile` - モバイル向けに最適化された Next.js アプリ

### パッケージ

- `packages/ui` - 共有 React コンポーネントライブラリ
- `packages/typescript-config` - 共有 TypeScript 設定

各パッケージ/アプリは 100% [TypeScript](https://www.typescriptlang.org/) で書かれています。

## 🚀 はじめに

### 前提条件

- Node.js >= 18
- [Bun](https://bun.sh/) >= 1.2.18

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd my-turborepo-playground

# 依存関係をインストール
bun install
```

### 開発

すべてのアプリとパッケージを同時に開発する場合：

```bash
bun dev
```

特定のアプリを開発する場合：

```bash
bun dev --filter=desktop
bun dev --filter=mobile
bun dev --filter=api
```

### ビルド

すべてのアプリとパッケージをビルドする場合：

```bash
bun build
```

特定のアプリをビルドする場合：

```bash
bun build --filter=<app-name>
```

## 🛠 利用可能なスクリプト

- `bun dev` - すべてのアプリの開発サーバーを起動
- `bun build` - すべてのアプリをプロダクション用にビルド
- `bun lint` - Biome リンターを実行
- `bun check` - リンターを実行し、問題を自動修正
- `bun check-types` - TypeScript 型チェックを実行
- `bun format` - Biome と Prettier でコードをフォーマット

## 🏗 技術スタック

- **パッケージマネージャー**: [Bun](https://bun.sh/)
- **ビルドシステム**: [Turborepo](https://turbo.build/repo)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **リンター/フォーマッター**: [Biome](https://biomejs.dev/) + [Prettier](https://prettier.io/)
- **Git フック**: [Lefthook](https://github.com/evilmartians/lefthook)

### フロントエンドアプリ（Desktop/Mobile）

- **フレームワーク**: [Next.js](https://nextjs.org/) 15.3.5
- **UI ライブラリ**: [React](https://react.dev/) 19
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) v4

### API

- **フレームワーク**: [Hono](https://hono.dev/)
- **ランタイム**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **開発ツール**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## 📁 プロジェクト構造

```
my-turborepo-playground/
├── apps/
│   ├── api/          # Cloudflare Workers API
│   ├── desktop/      # Next.js デスクトップアプリ
│   └── mobile/       # Next.js モバイルアプリ
├── packages/
│   ├── ui/           # 共有 React コンポーネント
│   └── typescript-config/  # 共有 TS 設定
├── docs/             # ドキュメント
│   └── turborepo-vitest-guide.md  # Vitest 統合ガイド
├── .github/          # GitHub Actions ワークフロー
├── biome.json        # Biome 設定
├── lefthook.yml      # Git フック設定
├── turbo.json        # Turborepo 設定
└── package.json      # ルート package.json
```

## 🔧 設定

### コードスタイル

このプロジェクトは Biome を使用してリンティングとフォーマットを行い、以下の設定を使用しています：

- タブインデント
- ダブルクォート
- Git コミット時の自動フォーマット（Lefthook による）

### TypeScript

共有 TypeScript 設定は `packages/typescript-config` で利用可能です：

- `base.json` - 基本設定
- `nextjs.json` - Next.js 固有の設定
- `react-library.json` - React ライブラリ設定

## 📚 ドキュメント

- [Turborepo Vitest 統合ガイド](docs/turborepo-vitest-guide.md) - Vitest と Turborepo の統合に関する包括的なガイド

## 🧪 テスト（計画中）

このプロジェクトでは Vitest を使用したテストの導入を計画しています。パッケージごとの設定と Vitest Projects の両方の利点を組み合わせたハイブリッドアプローチを推奨します：

- ローカル開発：Vitest Projects でより良い開発体験
- CI：パッケージごとの設定で Turborepo のキャッシュを活用

詳細は [Vitest 統合ガイド](docs/turborepo-vitest-guide.md) を参照してください。

## 🤝 コントリビューション

1. フィーチャーブランチを作成
2. 変更を行う
3. `bun check` を実行してコード品質を確認
4. 変更をコミット（自動フォーマットが適用されます）
5. プッシュしてプルリクエストを作成

## 📄 ライセンス

このプロジェクトはオープンソースで、[MIT ライセンス](LICENSE) の下で利用可能です。
