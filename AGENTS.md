# AGENTS.md

Repository guide for coding agents working in `/home/grayred/firommao.github.io`.

## Project Snapshot

- Stack: Astro 5, TypeScript, UnoCSS, `astro-pure`, Vercel adapter.
- Package manager: Bun (`bun.lock` is committed).
- Module format: ESM (`"type": "module"`).
- TypeScript baseline: `astro/tsconfigs/strict` plus repo-specific path aliases.
- Tests: no automated test runner is currently configured.

## Instruction Sources Checked

- Existing `AGENTS.md`: none was present before this file.
- Cursor rules: no `.cursor/rules/` files found.
- Cursor root rules: no `.cursorrules` file found.
- Copilot rules: no `.github/copilot-instructions.md` file found.
- If any of those appear later, treat them as additional repo instructions.

## Environment

- Use Bun for installs and scripts unless a task explicitly requires Node tooling.
- Node.js 18+ is the minimum runtime noted in `README.md`.
- Do not assume npm, pnpm, or yarn lockfiles exist.
- Astro is configured for server output with the Vercel adapter.

## Core Commands

- Install dependencies: `bun install`
- Start dev server: `bun dev`
- Dev server + watcher typecheck: `bun run dev:check`
- Sync Astro types/content: `bun sync`
- Create a new post/template entry: `bun new`
- Full build pipeline: `bun run build`
- Type check only: `bun check`
- Lint fixable source files: `bun lint`
- Format supported files: `bun format`
- Clean generated output: `bun run clean`
- Repo hygiene shortcut: `bun run yijiansilian`

## Build And Verification Notes

- `bun run build` runs `astro-pure check && astro check && astro build`.
- For most code changes, the useful verification set is `bun lint`, `bun check`, then `bun run build`.
- `scripts/*` is ignored by ESLint, so script edits need extra manual review.
- Do not manually edit generated output such as `.astro/` or `dist/`.

## Test Status

- There is no `test` script in `package.json`.
- There are no `*.test.*` or `*.spec.*` files in the repo.
- No Jest, Vitest, Playwright, or other test config is checked in.
- There is therefore no real single-test command today.

## Single-Test Guidance

- Do not invent `bun test` commands unless you first add and validate a test runner.
- If you introduce tests, also document the full-suite command, single-file command, and single-test-name filter here.
- Until then, treat `bun check` and `bun run build` as the main safety checks.

## Important Files

- `astro.config.ts`: Astro integration, markdown, and adapter setup.
- `tsconfig.json`: strictness and alias definitions.
- `eslint.config.mjs`: Astro ESLint recommended config.
- `prettier.config.mjs`: formatting and import ordering rules.
- `uno.config.ts`: UnoCSS theme and typography rules.
- `src/site.config.ts`: site-wide config and integration settings.
- `src/content.config.ts`: content collection schema.

## Path Aliases

- `@/assets/*` -> `src/assets/*`
- `@/components/*` -> `src/components/*`
- `@/layouts/*` -> `src/layouts/*`
- `@/utils` and `@/utils/*` -> `src/utils/*`
- `@/plugins/*` -> `src/plugins/*`
- `@/pages/*` -> `src/pages/*`
- `@/types` -> `src/types/index.ts`
- `@/site-config` -> `src/site.config.ts`

## Import Rules

- Let Prettier sort imports; do not fight the import-order plugin.
- Group imports in this order: `astro`/`astro:*`, `@astrojs/*`, third-party packages, `astro-pure/*`, internal aliases, then relative imports.
- Internal alias order is: `@/types`, `@/layouts`, `@/pages`, `@/components`, `@/utils`, `@/plugins`, `@/assets`, `@/site-config`.
- Use `import type` for type-only imports when possible.
- Prefer alias imports over deep relative paths.

## Formatting Rules

- Prettier is authoritative.
- Use 2 spaces, no tabs.
- Use single quotes.
- Do not use semicolons.
- Print width is 100.
- Trailing commas are disabled.
- Keep parentheses around single-argument arrow functions.
- Use LF line endings.
- Run `bun format` after non-trivial edits.

## TypeScript Rules

- Assume strict typing expectations throughout the repo.
- `strictNullChecks` is enabled; narrow nullable values before use.
- `verbatimModuleSyntax` is enabled; keep imports/exports ESM-correct.
- Prefer TypeScript for new logic even though `allowJs` is enabled.
- Use explicit prop/data types for structured objects.
- Prefer inference and runtime narrowing over broad `as` casts.
- Use `Record<K, V>` for map-like objects when appropriate.

## Astro Conventions

- Keep `.astro` frontmatter small, typed, and close to the component's real needs.
- Declare a `Props` interface or type for structured props.
- Read props from `Astro.props`, usually via top-level destructuring.
- Prefer layouts/components over duplicated page markup.
- Keep browser-side scripts minimal and colocated with the component using them.
- Use `define:vars` or inline scripts only when runtime browser behavior is required.

## Naming Conventions

- Components and layouts: PascalCase filenames and symbols.
- Utility functions and local variables: camelCase.
- Constants: `UPPER_SNAKE_CASE` only for genuine fixed constants.
- Keep exported names aligned with file purpose.
- Prefer descriptive names over abbreviations unless matching established project vocabulary.

## Error Handling

- Throw explicit errors for invalid programmer inputs or impossible states.
- Use `try`/`catch` around network and file-system boundaries.
- Log actionable context in scripts and client-side failure paths.
- Narrow caught errors before reading `.message`.
- Avoid silent failures; either recover intentionally or log clearly.
- Prefer graceful UI degradation over hard render crashes when recovery is possible.

## Content And Config Patterns

- Update `src/content.config.ts` when frontmatter/schema requirements change.
- Prefer schema-driven validation with Astro content collections and Zod.
- Keep site-wide literals in `src/site.config.ts` instead of scattering them across pages.
- Normalize data close to the schema boundary, following the tag dedupe/lowercasing pattern.

## Styling Conventions

- Styling is primarily UnoCSS utility driven.
- Reuse theme variables and existing utility patterns before adding one-off CSS.
- Keep custom CSS near the component or layout that owns it.
- Preserve existing responsive behavior and class naming style.

## Agent Workflow

- Make focused edits that match surrounding patterns.
- Prefer modifying existing layouts/components/config over creating parallel abstractions.
- If you add a new workflow command, update this file.
- If you add tests, add concrete full-suite and single-test commands here immediately.
- Before finishing meaningful changes, run the most relevant subset of `bun lint`, `bun check`, and `bun run build`.

## Current Handoff

- The starter/template content has been heavily cleaned out: docs content, sample posts, sponsorship/demo assets, and other placeholder material were removed.
- `README.md` is now a usage guide for this site rather than upstream theme marketing docs.
- `src/pages/index.astro` was simplified to a compact personal-blog homepage with intro plus latest posts.
- Lightweight `About`, `Projects`, `Links`, and `Site Policy` pages were restored so the site keeps those features without the original template filler content.
- `src/site.config.ts` keeps the required `astro-pure` integration fields, restores basic site navigation, and disables Waline by default to avoid using the template's third-party comment service.
- `astro.config.ts` now points `site` at `https://firommao.github.io`.
- This environment does not have `bun`, so `bun lint`, `bun check`, `bun format`, and `bun run build` could not be executed here.
- On the next machine, first run `bun install`, then `bun lint`, `bun check`, and `bun run build` before making further structural edits.
- Likely next cleanup/customization tasks: replace `src/assets/avatar.png`, replace `public/images/social-card.png`, and refine `src/site.config.ts` copy/metadata.
