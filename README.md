# 🛠️ Just Monorepo

Bare minimum boilerplate featuring NPM Workspaces along with TypeScript, Webpack and ESLint integrations.

  - See [SPECS](SPECS.md) for project sample business area and processes
  - See [HOWTO](HOWTO.md) for guide how to create and set up monorepo like this

## Features

  - Monorepository using NPM workspaces: root meta-package (`just-monorepo`) with group of scoped sub-packages (`@just-monorepo/*`)
  - TypeScript types support for all packages
  - Webpack bundling and live-reloading watch mode
  - Examples of code:
    - `@just-monorepo/client` — Frontend client application made with React
    - `@just-monorepo/server` — Backend server application made with Express
    - `@just-monorepo/types` — Shared types and data contracts
    - `@just-monorepo/utils` — Shared utilities for applications

## Usage

Clone this repository:

```sh
git clone https://github.com/icmx/just-monorepo
```

Go to local saved copy:

```sh
cd just-monorepo
```

Install dependencies:

```sh
npm install
```

*Note:* this project is built on NPM workspaces feature and thus requires NPM v7 or higher. If you haven't one, there are some options:

  - Install Node.js v15 or higher where NPM v7 or higher is icluded
  - Manually install NPM v7 or higher:
    - Globally, by running `npm install --global npm@latest`
    - Locally for project, by running `npm install --save-dev npm@latest`
  - **(the simplest but the slowest one)** run latest NPM directly by using NPX: `npx npm@latest <npm-commands...>`

Build a specific package:

```sh
npm run build:client
npm run build:server
npm run build:types
npm run build:utils
```

Or all packages at once:

```sh
npm run build
```

Live-reload (watch mode) for applications packages:

```sh
npm run watch:client
npm run watch:server
```

*Note:* client application requires server application running. They can be started together just in separate terminal windows e.g.

Lint a specific package:

```sh
npm run lint:client
npm run lint:server
npm run lint:types
npm run lint:utils
```

Or all packages at once:

```sh
npm run lint
```

## Motivation

There are lots of similar boilerplates already indeed. However, most of them are incredibly bloated by endless dependencies, which may be deprecated, outdated and not even used at all, thus I suppose there should be some really lightweight and easy to use alternative.

Please note that packages choice for Just Monorepo not only bare, but also sane — this project is not about making it as small as possible.

## Structure

Project structure is described in [HOWTO](HOWTO.md).

## See Also

  - [Just Gulp](https://github.com/icmx/just-gulp) — same project, but much smaller and for bundling frontend application by using gulp.
  - [Just Webpack](https://github.com/icmx/just-webpack) — same, but for Webpack.
