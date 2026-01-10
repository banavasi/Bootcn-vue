# bootcn-vue Project Backlog

> **Project:** bootcn-vue - Bootstrap + Vue 3 Component Library with CLI
> **Started:** 2026-01-09
> **Status:** In Progress

---

## Legend

| Status      | Symbol | Description                    |
| ----------- | ------ | ------------------------------ |
| Not Started | `[ ]`  | Work not yet begun             |
| In Progress | `[~]`  | Currently being worked on      |
| Blocked     | `[!]`  | Blocked by dependency or issue |
| Complete    | `[x]`  | Done and verified              |
| Cancelled   | `[-]`  | No longer needed               |

| Priority | Label |
| -------- | ----- |
| Critical | `P0`  |
| High     | `P1`  |
| Medium   | `P2`  |
| Low      | `P3`  |

---

## Sprint Overview

| Sprint   | Focus                   | Status                  |
| -------- | ----------------------- | ----------------------- |
| Sprint 1 | Monorepo Infrastructure | `[~]` In Progress (80%) |
| Sprint 2 | Core & Button Package   | `[ ]` Not Started       |
| Sprint 3 | CLI Development         | `[ ]` Not Started       |
| Sprint 4 | CI/CD & Publishing      | `[ ]` Not Started       |
| Sprint 5 | Forms Package           | `[ ]` Not Started       |
| Sprint 6 | Documentation & Polish  | `[ ]` Not Started       |

---

## E1: Monorepo Infrastructure (P0 - Critical)

**Goal:** Set up a professional monorepo with Turborepo, pnpm workspaces, and development tooling.

### S1.1: Repository Restructure (P0)

> Convert current project to monorepo structure with pnpm workspaces

#### Tasks

- [x] **T1.1.1:** Create monorepo directory structure
  - [x] Create `packages/` directory
  - [x] Create `apps/playground/` directory
  - [x] Create `packages/cli/` directory
  - [x] Create `packages/core/` directory
  - [x] Create `packages/buttons/` directory
  - [x] Create `packages/forms/` directory

- [x] **T1.1.2:** Configure pnpm workspaces
  - [x] Create `pnpm-workspace.yaml` with package globs
  - [x] Update root `package.json` for workspace
  - [x] Move current app to `apps/playground/`

- [x] **T1.1.3:** Configure Turborepo
  - [x] Install `turbo` as dev dependency
  - [x] Create `turbo.json` with task pipelines
  - [x] Configure build, lint, test, type-check tasks
  - [x] Set up output caching

### S1.2: Development Tooling (P0)

> Set up Husky, lint-staged, commitlint for code quality

#### Tasks

- [x] **T1.2.1:** Configure Husky for git hooks
  - [x] Install husky
  - [x] Initialize husky (`npx husky init`)
  - [x] Create pre-commit hook
  - [x] Create commit-msg hook

- [x] **T1.2.2:** Configure lint-staged
  - [x] Install lint-staged
  - [x] Configure lint-staged in package.json
  - [x] Set up file patterns for linting

- [x] **T1.2.3:** Configure commitlint
  - [x] Install `@commitlint/cli` and `@commitlint/config-conventional`
  - [x] Create `commitlint.config.js`
  - [x] Add commit-msg hook for commitlint

- [x] **T1.2.4:** Configure Changesets
  - [x] Install `@changesets/cli`
  - [x] Initialize changesets (`npx changeset init`)
  - [x] Configure `.changeset/config.json`
  - [ ] Add `@changesets/changelog-github` for changelog generation

### S1.3: Shared Configuration (P1)

> Create shared TypeScript, ESLint, and build configurations

#### Tasks

- [ ] **T1.3.1:** Create shared TypeScript config
  - [ ] Create `packages/tsconfig/` or use root configs
  - [ ] Create base, node, and vue tsconfig files
  - [ ] Update package tsconfigs to extend shared

- [ ] **T1.3.2:** Create shared ESLint config
  - [ ] Evaluate eslint config sharing approach
  - [ ] Ensure all packages use consistent linting

---

## E2: Core Package & Button Component (P1 - High)

**Goal:** Create the foundational `@bootcn-vue/core` package and migrate Button component.

### S2.1: Core Package Setup (P0)

> Create @bootcn-vue/core with utilities and shared code

#### Tasks

- [ ] **T2.1.1:** Initialize core package
  - [ ] Create `packages/core/package.json`
  - [ ] Set up package metadata (name, version, exports)
  - [ ] Configure peer dependencies (vue)

- [ ] **T2.1.2:** Add utility functions
  - [ ] Copy/create `cn()` utility function
  - [ ] Create `lib/utils.ts`
  - [ ] Set up barrel exports in `index.ts`

- [ ] **T2.1.3:** Configure package build
  - [ ] Install and configure `tsup`
  - [ ] Create build script
  - [ ] Generate TypeScript declarations
  - [ ] Test build output

### S2.2: Buttons Package Setup (P1)

> Create @bootcn-vue/buttons and migrate Button component

#### Tasks

- [ ] **T2.2.1:** Initialize buttons package
  - [ ] Create `packages/buttons/package.json`
  - [ ] Set up dependencies (reka-ui, cva, @bootcn-vue/core)
  - [ ] Configure peer dependencies

- [ ] **T2.2.2:** Migrate Button component
  - [ ] Copy Button.vue from playground
  - [ ] Copy index.ts with cva variants
  - [ ] Update imports to use @bootcn-vue/core
  - [ ] Create barrel exports

- [ ] **T2.2.3:** Add Button tests
  - [ ] Set up Vitest for package
  - [ ] Migrate/create Button.spec.ts
  - [ ] Ensure all tests pass

- [ ] **T2.2.4:** Add Button to Storybook
  - [ ] Configure Storybook to use packages
  - [ ] Create/update Button.stories.ts
  - [ ] Verify stories render correctly

- [ ] **T2.2.5:** User Testing Checkpoint
  - [ ] Request user to test Button in Storybook
  - [ ] Collect feedback and make adjustments
  - [ ] Confirm component is ready

---

## E3: CLI Development (P1 - High)

**Goal:** Build the `@bootcn-vue/cli` with init and add commands.

### S3.1: CLI Package Setup (P0)

> Initialize CLI package with Commander.js

#### Tasks

- [ ] **T3.1.1:** Initialize CLI package
  - [ ] Create `packages/cli/package.json`
  - [ ] Set up bin entry point
  - [ ] Install dependencies (commander, prompts, picocolors)

- [ ] **T3.1.2:** Set up CLI structure
  - [ ] Create `src/index.ts` entry point
  - [ ] Create `src/commands/` directory
  - [ ] Create `src/utils/` directory
  - [ ] Create `src/schemas/` directory

- [ ] **T3.1.3:** Configure CLI build
  - [ ] Set up tsup for CLI bundling
  - [ ] Configure shebang for executable
  - [ ] Test CLI can be invoked

### S3.2: Init Command (P0)

> Implement the `bootcn-vue init` command

#### Tasks

- [ ] **T3.2.1:** Create config schema
  - [ ] Define `bootcn.config.json` schema with Zod
  - [ ] Define prompts for user input
  - [ ] Handle defaults and validation

- [ ] **T3.2.2:** Implement project detection
  - [ ] Detect if Vue 3 + Vite project
  - [ ] Detect package manager (pnpm/npm/yarn)
  - [ ] Detect existing tsconfig paths

- [ ] **T3.2.3:** Implement vite.config.ts updater
  - [ ] Parse existing vite.config.ts
  - [ ] Add alias for @/ui and @/lib
  - [ ] Write updated config

- [ ] **T3.2.4:** Implement tsconfig.json updater
  - [ ] Parse existing tsconfig.json
  - [ ] Add paths for aliases
  - [ ] Write updated config

- [ ] **T3.2.5:** Implement utils copy
  - [ ] Copy utils.ts to user's lib directory
  - [ ] Transform imports if needed

- [ ] **T3.2.6:** Implement dependency installer
  - [ ] Detect package manager
  - [ ] Install base dependencies (reka-ui, cva, clsx, tailwind-merge)
  - [ ] Handle installation errors

### S3.3: Add Command (P1)

> Implement the `bootcn-vue add <package>` command

#### Tasks

- [ ] **T3.3.1:** Create registry system
  - [ ] Define registry item schema
  - [ ] Create registry.json for each package
  - [ ] Set up registry fetching (local for now)

- [ ] **T3.3.2:** Implement component selector
  - [ ] List available components from package
  - [ ] Multi-select prompt for components
  - [ ] Handle component dependencies

- [ ] **T3.3.3:** Implement file copier
  - [ ] Read component files from registry
  - [ ] Transform imports (@bootcn-vue/core -> @/lib/utils)
  - [ ] Write files to user's ui directory

- [ ] **T3.3.4:** Implement dependency resolver
  - [ ] Resolve registryDependencies recursively
  - [ ] Collect all npm dependencies
  - [ ] Install missing dependencies

- [ ] **T3.3.5:** Add command testing
  - [ ] Create test fixtures
  - [ ] Test init command end-to-end
  - [ ] Test add command end-to-end

### S3.4: CLI User Testing (P1)

> Test CLI with real projects

#### Tasks

- [ ] **T3.4.1:** Create test Vue project
  - [ ] Create fresh Vue 3 + Vite project
  - [ ] Run `bootcn-vue init`
  - [ ] Verify config files updated

- [ ] **T3.4.2:** Test add command
  - [ ] Run `bootcn-vue add buttons`
  - [ ] Verify Button component copied
  - [ ] Verify imports work correctly

- [ ] **T3.4.3:** User Testing Checkpoint
  - [ ] Request user to test CLI
  - [ ] Collect feedback and make adjustments
  - [ ] Confirm CLI is ready

---

## E4: CI/CD & Publishing (P1 - High)

**Goal:** Set up GitHub Actions for testing, publishing, and Storybook deployment.

### S4.1: GitHub Actions - CI (P0)

> Set up continuous integration workflows

#### Tasks

- [ ] **T4.1.1:** Create CI workflow
  - [ ] Create `.github/workflows/ci.yml`
  - [ ] Set up pnpm and Node.js
  - [ ] Run lint, type-check, test on PRs
  - [ ] Run build to verify packages compile

- [ ] **T4.1.2:** Configure Turborepo caching
  - [ ] Set up Turborepo remote caching (optional)
  - [ ] Configure GitHub Actions caching for pnpm

### S4.2: GitHub Actions - Release (P1)

> Set up automatic releases with Changesets

#### Tasks

- [ ] **T4.2.1:** Create release workflow
  - [ ] Create `.github/workflows/release.yml`
  - [ ] Configure Changesets action
  - [ ] Set up NPM_TOKEN secret
  - [ ] Test release process

- [ ] **T4.2.2:** Configure npm publishing
  - [ ] Set up npm organization (if needed)
  - [ ] Configure package.json for publishing
  - [ ] Add publishConfig to packages
  - [ ] Test publish with dry-run

### S4.3: GitHub Actions - Storybook (P1)

> Deploy Storybook to GitHub Pages

#### Tasks

- [ ] **T4.3.1:** Create Storybook deploy workflow
  - [ ] Create `.github/workflows/storybook.yml`
  - [ ] Build Storybook on main push
  - [ ] Deploy to GitHub Pages

- [ ] **T4.3.2:** Configure GitHub Pages
  - [ ] Enable GitHub Pages in repo settings
  - [ ] Configure custom domain (optional)
  - [ ] Verify deployment works

---

## E5: Forms Package (P2 - Medium)

**Goal:** Create `@bootcn-vue/forms` with Input, MaskInput, and future form components.

### S5.1: Forms Package Setup (P1)

> Initialize @bootcn-vue/forms package

#### Tasks

- [ ] **T5.1.1:** Initialize forms package
  - [ ] Create `packages/forms/package.json`
  - [ ] Set up dependencies
  - [ ] Configure build

- [ ] **T5.1.2:** Migrate Input component
  - [ ] Copy Input.vue from playground
  - [ ] Update imports
  - [ ] Add to registry.json

- [ ] **T5.1.3:** Add Input tests
  - [ ] Migrate Input.spec.ts
  - [ ] Ensure all tests pass

- [ ] **T5.1.4:** Add Input to Storybook
  - [ ] Create/update Input.stories.ts
  - [ ] Verify stories render correctly

### S5.2: MaskInput Component (P2)

> Create MaskInput component with Alpine.js

#### Tasks

- [ ] **T5.2.1:** Research Alpine.js + Vue integration
  - [ ] Evaluate @alpinejs/mask
  - [ ] Evaluate Vue-native alternatives (maska, imask)
  - [ ] Choose approach

- [ ] **T5.2.2:** Implement MaskInput component
  - [ ] Create MaskInput.vue
  - [ ] Create index.ts with variants
  - [ ] Handle mask patterns (phone, date, currency)

- [ ] **T5.2.3:** Add MaskInput tests
  - [ ] Create MaskInput.spec.ts
  - [ ] Test mask application
  - [ ] Test value extraction

- [ ] **T5.2.4:** Add MaskInput to Storybook
  - [ ] Create MaskInput.stories.ts
  - [ ] Show various mask patterns

- [ ] **T5.2.5:** User Testing Checkpoint
  - [ ] Request user to test forms components
  - [ ] Collect feedback
  - [ ] Confirm ready for release

---

## E6: Documentation & Polish (P2 - Medium)

**Goal:** Create documentation, polish Storybook, and prepare for public release.

### S6.1: Storybook Documentation (P1)

> Enhance Storybook with full documentation

#### Tasks

- [ ] **T6.1.1:** Create introduction page
  - [ ] Add welcome/intro MDX
  - [ ] Add installation instructions
  - [ ] Add quick start guide

- [ ] **T6.1.2:** Document each component
  - [ ] Add component description
  - [ ] Document all props
  - [ ] Add usage examples
  - [ ] Add accessibility notes

- [ ] **T6.1.3:** Add theming documentation
  - [ ] Document Bootstrap/RDS theming
  - [ ] Show customization examples

### S6.2: README & Guides (P2)

> Create comprehensive README and guides

#### Tasks

- [ ] **T6.2.1:** Create root README
  - [ ] Project overview
  - [ ] Quick start
  - [ ] Package list with links

- [ ] **T6.2.2:** Create package READMEs
  - [ ] CLI usage guide
  - [ ] Core utilities guide
  - [ ] Component package guides

- [ ] **T6.2.3:** Create CONTRIBUTING.md
  - [ ] Development setup
  - [ ] Contribution guidelines
  - [ ] Commit conventions

### S6.3: Final Polish (P2)

> Final testing and release preparation

#### Tasks

- [ ] **T6.3.1:** End-to-end testing
  - [ ] Test full workflow in fresh project
  - [ ] Verify all components work
  - [ ] Fix any issues

- [ ] **T6.3.2:** Performance review
  - [ ] Check bundle sizes
  - [ ] Optimize if needed

- [ ] **T6.3.3:** Release v0.1.0
  - [ ] Create changeset for initial release
  - [ ] Merge to main
  - [ ] Verify npm packages published
  - [ ] Verify Storybook deployed

---

## Completed Items

> Move completed stories/tasks here for reference

### Completed in Sprint 0 (Pre-project)

- [x] **Button Component** - Initial implementation with cva variants
- [x] **Input Component** - Full implementation with validation, error states
- [x] **Storybook Setup** - Basic Storybook configuration
- [x] **Unit Tests** - 68 tests passing (Button + Input)

---

## Notes & Decisions

### Package Naming

- Organization: `@bootcn-vue`
- Packages: `cli`, `core`, `buttons`, `forms`, `overlays` (future)

### Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Versioning:** Changesets with conventional commits
- **Build:** tsup for packages
- **Testing:** Vitest (unit), Playwright (e2e)
- **Documentation:** Storybook

### Conventions

- Conventional commits required (enforced by commitlint)
- All PRs require passing CI
- Changesets required for version bumps
- User testing checkpoint before major merges

---

## Changelog

| Date       | Change                  |
| ---------- | ----------------------- |
| 2026-01-09 | Initial backlog created |
