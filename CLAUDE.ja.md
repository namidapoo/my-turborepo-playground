# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを扱う際のガイダンスを提供します。

## コードベース概要

これは Turborepo を使用したモノレポプロジェクトです。Bun をパッケージマネージャーとして使用し、複数のアプリケーションと共有パッケージを管理しています。

### アプリケーション構成

- **apps/api**: Cloudflare Workers 上で動作する Hono API
- **apps/desktop**: デスクトップ向け Next.js アプリ（React 19、Tailwind CSS v4）
- **apps/mobile**: モバイル向け Next.js アプリ（React 19、Tailwind CSS v4）

### 共有パッケージ

- **packages/ui**: 共有 React コンポーネントライブラリ（button、card、code コンポーネント）
- **packages/typescript-config**: 共有 TypeScript 設定

## 開発コマンド

```bash
# 開発環境起動
bun dev                    # 全アプリ同時起動
bun dev --filter=desktop   # desktop アプリのみ
bun dev --filter=mobile    # mobile アプリのみ
bun dev --filter=api       # API のみ

# ビルド
bun build                  # 全体ビルド
bun build --filter=<app>   # 特定アプリのビルド

# コード品質チェック
bun lint                   # Biome によるリント
bun check                  # リント + フォーマット（自動修正）
bun check-types            # TypeScript 型チェック
bun format                 # コードフォーマット

# API 専用コマンド（apps/api ディレクトリで実行）
bun run deploy             # Cloudflare Workers へデプロイ
bun run cf-typegen         # Cloudflare バインディングの型生成
```

## アーキテクチャと重要な設計方針

### モノレポ構成

- Turborepo によるタスクの並列実行と依存関係管理
- 共有パッケージは `@repo/*` という名前空間を使用
- 各アプリは独立してビルド・デプロイ可能

### コード品質管理

- **Biome** がメインのリンター/フォーマッター（タブインデント、ダブルクォート）
- **Prettier** は Biome がサポートしないファイル用
- **Lefthook** による Git フック（pre-commit で自動フォーマット、pre-push でチェック）

### Next.js アプリケーション（desktop/mobile）

- Next.js 15.3.5 + React 19 の最新構成
- Tailwind CSS v4（設定ファイルなしの新方式）
- `@repo/ui` から共有コンポーネントをインポート
- Turbopack による高速な開発環境

### Cloudflare Workers API

- Hono フレームワークを使用したエッジ API
- Wrangler で開発・デプロイを管理
- TypeScript による型安全な開発

### 依存関係の解決順序

1. 共有パッケージ（ui、typescript-config）が最初にビルドされる
2. アプリケーションが共有パッケージを利用してビルドされる
3. Turborepo が自動的に依存関係を解決

## 開発時の注意事項

1. **パッケージマネージャー**: 必ず `bun` を使用（`npm`、`yarn`、`pnpm` は使用禁止）
2. **コードスタイル**: Biome の設定に従う（タブインデント、ダブルクォート）
3. **型安全性**: `any` 型の使用を避け、適切な型定義を行う
4. **VS Code 診断**: `mcp__ide__getDiagnostics` で型エラーがないことを確認
5. **Git コミット**: Lefthook による自動フォーマットが適用される

## ドキュメント

- **docs/turborepo-vitest-guide.md**: Vitest と Turborepo の統合に関する包括的なガイド（3つの異なる戦略とトレードオフを含む）

## テスト戦略（計画中）

このプロジェクトでは Vitest によるテストの実装を計画しています。統合戦略の分析に基づいて：

1. **ハイブリッドアプローチ**（推奨）：パッケージごとの設定と Vitest Projects の両方の利点を組み合わせる
   - ローカル開発では Vitest Projects を使用して開発体験を向上
   - CI ではパッケージごとの設定でキャッシュの恩恵を受ける
   - カバレッジレポートの手動マージが必要

2. **代替アプローチ**：
   - パッケージごとの設定：最高のキャッシュ効率だがカバレッジの手動マージが必要
   - Vitest Projects：シンプルな設定だが Turborepo のキャッシュ機能を失う
