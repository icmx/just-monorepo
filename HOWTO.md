# How To

> *This document describes how to create such monorepository by using just NPM workspaces feature.*

Few notes before we start:

  - Created monorepository will rely on Node.js' JavaScript and Typescript, so it won't work for other languages and infrastructures obvoiusly
  - Created monorepository will require NPM v7 or higher since it's relies on NPM workspaces. If you haven't one, there are some options:
    - Install Node.js v15 or higher where NPM v7 or higher is icluded
    - Manually install NPM v7 or higher:
      - Globally, by running `npm install --global npm@latest`
      - Locally for project, by running `npm install --save-dev npm@latest`
    - **(the simplest but the slowest one)** run latest NPM directly by using npx: `npx npm@latest <npm-commands...>`

## Step 1. Initialization

Create a new directory that will be the root for a new monorepository. In this article it's supposed that root directory name is `just-monorepo`.

Switch to created directory and initialize a new git repository then:

```sh
cd just-monorepo
git init
```

Initialize a new NPM package that will be the root package:

```sh
npm init --yes
```

Enable workspaces in previously created package so it become root meta-package for real sub-packages. To do so, clean up created root `package.json` and make it looks like this:

```json
{
  "name": "just-monorepo",
  "version": "0.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

Here `"workspaces"` property holds list of directories of actual sub-packages. See [NPM docs](https://docs.npmjs.com/cli/v7/using-npm/workspaces) for details.

There is no "common" or "best" packages structure. Sometimes it's better to use flat structure of just `packages/*` directory while sometimes it can be splitted up to `apps/*`, `libs/*`, `<etc>/*` and so on structure. In order to provide simple and clean example this monorepo will use first flat option.

Create the following file structure:

```
just-monorepo/  —  root package: just-monorepo
├── packages/
│   ├── client/
│   │   └── package.json  —  sub-package: @just-monorepo/client
│   ├── server/
│   │   └── package.json  —  sub-package: @just-monorepo/server
│   ├── types/
│   │   └── package.json  —  sub-package: @just-monorepo/types
│   └── utils/
│       └── package.json  —  sub-package: @just-monorepo/utils
└── package.json
```

Each sub-package is just a sub-directory of `packages` directory. Each such directory includes `package.json` file with following contents:

```json
{
  "name": "@just-monorepo/<sub-package-name>",
  "version": "0.0.0",
  "author": "...",
  "license": "...",
  "homepage": "...",
  "bugs": {
    "url": "..."
  },
  "repository": {
    "type": "git",
    "url": "git+https://example.org/just-monorepo.git",
    "directory": "packages/<sub-package-name>"
  }
}
```

Where `<sub-package-name>` is one of `packages` subdirectories names, e.g:

```json
"name": "@just-monorepo/client"
```

Now it's ready. A blank monorepository with 4 sub-packages is created.

## Step 2. Integrating TypeScript

Types and data contracts are essential for large realworld projects, so it's definitely need to use some types system in this monorepository. For Node.js/JavaScript one can use TypeScript which can be simply integrated by installing TypeScript package first.

In root directory:

```sh
npm install --save-dev typescript
```

To compile TypeScript sources into executable JavaScript files create a `tsconfig.json` splitted configuration for each sub-package and for root package too:

```diff
  just-monorepo/
  ├── packages/
  │   ├── client/
  │   │   ├── package.json
+ │   │   └── tsconfig.json ← Sub-package TypeScript configuration
  │   ├── server/
  │   │   ├── package.json
+ │   │   └── tsconfig.json ← Sub-package TypeScript configuration
  │   ├── types/
  │   │   ├── package.json
+ │   │   └── tsconfig.json ← Sub-package TypeScript configuration
  │   └── utils/
  │       ├── package.json
+ │       └── tsconfig.json ← Sub-package TypeScript configuration
+ ├── tsconfig.json ← Root TypeScript configuration
  └── package.json
```

Root `tsconfig.json` will contain base of configuration:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "module": "commonjs",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "allowJs": true,
    "target": "ES2020",
    "noImplicitAny": true,
    "declaration": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "skipLibCheck": true
  },
  "paths": {
    "*": ["node_modules/*"]
  }
}
```

While sub-packages `tsconfig.json` files will extend the base and contain just paths per each sub-package:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "src",
    "outDir": "dist"
  },
  "files": ["src/index.ts"]
}
```

Then `package.json` of each sub-package should now contain the following properties:

  - build script (`"scripts.build"`)
  - path working files (`"files"`)
  - path to types definitions (`"types"`)
  - path to entry point (`"main"`)


```diff
@@ -11,5 +11,13 @@
      "type": "git",
      "url": "git+https://example.org/just-monorepo.git",
      "directory": "packages/<sub-package-name>"
-   }
+   },
+   "scripts": {
+     "build": "tsc"
+   },
+   "files": [
+     "dist"
+   ],
+   "types": "dist/index.d.ts",
+   "main": "dist/index.js"
  }
```

These values above are the same for all the 4 sub-packages for now.

Each sub-package should now have an entry point file `src/index.ts`. It could be left empty for now:

```diff
  just-monorepo/
  ├── packages/
  │   ├── client/
  │   │   ├── src/
+ │   │   │   └── index.ts ← Entry point file
  │   │   ├── package.json
  │   │   └── tsconfig.json
  │   ├── server/
  │   │   ├── src/
+ │   │   │   └── index.ts ← Entry point file
  │   │   ├── package.json
  │   │   └── tsconfig.json
  │   ├── types/
  │   │   ├── src
+ │   │   │   └── index.ts ← Entry point file
  │   │   ├── package.json
  │   │   └── tsconfig.json
  │   └── utils/
  │       ├── src
+ │       │   └── index.ts ← Entry point file
  │       ├── package.json
  │       └── tsconfig.json
  ├── tsconfig.json
  └── package.json
```

Also, root `package.json` should now have global building scripts:

```diff
@@ -4,5 +4,15 @@
    "private": true,
    "workspaces": [
      "packages/*"
-   ]
+   ],
+   "scripts": {
+     "build:client": "npm run build --prefix packages/client",
+     "build:server": "npm run build --prefix packages/server",
+     "build:types": "npm run build --prefix packages/types",
+     "build:utils": "npm run build --prefix packages/utils",
+     "build": "npm run build:client && npm run build:server && npm run build:types && npm run build:utils"
+   },
+   "devDependencies": {
+     "typescript": "..."
+   }
```

Now it's done. A monorepository with integrated types support provided by TypeScript is created.

It can now build any package by running:

```sh
npm run build:<package>
```

For instance,

```sh
npm run build:types
```

Or build all of them at once:

```sh
npm run build
```

## Step 3. Populating Sub-Packages

### Types Sub-Package

**`@just-monorepo/types`** is types and data contracts defenetions sub-package. This sub-package will defenitely be consumed by others sub-packages, so it should be populated first.

Create some data contract definition that will be used later. In `src/vehicles/vehicle.dto.ts`:

```ts
export interface OrderDto {
  vehicleId: number;
  fullName: string;
  contacts: string;
}
```

And so on, as in actual example code.

Now types sub-package is done. Build it by using command from root directory:

```sh
npm run build:types
```

### Utilities Package

**`@just-monorepo/utils`** is generic utility functions sub-package which will be used both used by client and server applications. Among others this sub-package provides validation utilities for `OrderDto` structure validation.

Since `OrderDto` interface is defined and exported in `@just-monorepo/types` sub-package it should be integrated into `@just-monorepo/utils` as a development dependency. Types sub-package is never published so it can be added only manually by editing `package.json` of `@just-monorepo/utils`:

```diff
@@ -19,5 +19,8 @@
      "dist"
    ],
    "types": "dist/index.d.ts",
-   "main": "dist/index.js"
+   "main": "dist/index.js",
+   "devDependencies": {
+     "@just-monorepo/types": "0.0.0"
+   }
  }
```

Now link it by running `install` from root directory:

```sh
npm install
```

After `install` ends `OrderDto` can be imported in `@just-monorepo/utils` code, e.g. in `src/validate/is-valid.order.ts`:

```ts
import { OrderDto } from '@just-monorepo/types'; // ← Here

import { isNumber } from './is-number';
import { isFullString } from './is-full-string';

export const isValidOrder = ({ vehicleId, fullName, contacts }: OrderDto) =>
  isNumber(vehicleId) && isFullString(fullName) && isFullString(contacts);
```

Note some caveats:

  - Every time when `@just-monorepo/types` code is changed it should be re-built to be available in other sub-packages. Same does for every dependency sub-package.
  - For Visual Studio Code: use `Developer: Reload Window` comman if local sub-packages dependency is not recognized (i.e. in TypeScript `import`s)

Now utilities sub-package is done. Build it by using command from root directory:

```sh
npm run build:utils
```

### Server Sub-Package

**`@just-monorepo/server`** is server package. It will act like example of API server for client front-end applications.

To prepare server first install `express` and `cors` packages:

```sh
npm install --workspace=packages/server cors express
```

Then install development packages too:

```sh
npm install --workspace=packages/server --save-dev node-dev ts-node @types/cors @types/express
```

Setup watch and serve scripts in `package.json` of `@just-monorepo/server` package:

```diff
@@ -13,11 +13,25 @@
      "directory": "packages/server"
    },
    "scripts": {
-     "build": "tsc"
+     "build": "tsc",
+     "watch": "node-dev --notify=false src/index.ts",
+     "start": "node ."
    },
    "files": [
      "dist"
    ],
    "types": "dist/index.d.ts",
-   "main": "dist/index.js"
+   "main": "dist/index.js",
+   "dependencies": {
+     "cors": "^2.8.5",
+     "express": "^4.17.1"
+   },
+   "devDependencies": {
+     "@types/cors": "^2.8.12",
+     "@types/express": "^4.17.13",
+     "node-dev": "^7.0.0",
+     "ts-node": "^10.2.1"
+   }
  }
```

And for root `package.json` too:

```diff
@@ -11,6 +11,8 @@
      "build:types": "npm run build --prefix packages/types",
      "build:utils": "npm run build --prefix packages/utils",
      "build": "npm run build:client && npm run build:server && npm run build:types && npm run build:utils",
+     "watch:server": "npm run watch --prefix packages/server",
+     "start:server": "npm run start --prefix packages/server"
    },
    "devDependencies": {
      "typescript": "..."
```

Now add local types and utilities sub-packages as dependencies, like in section before:

```diff
@@ -23,10 +23,12 @@
    "types": "dist/index.d.ts",
    "main": "dist/index.js",
    "dependencies": {
+     "@just-monorepo/utils": "0.0.0",
      "cors": "^2.8.5",
      "express": "^4.17.1"
    },
    "devDependencies": {
+     "@just-monorepo/types": "0.0.0",
      "@types/cors": "^2.8.12",
      "@types/express": "^4.17.13",
      "node-dev": "^7.0.0",
```

Then link them by running `install` from root directory:

```sh
npm install
```

Now any exported code from `@just-monorepo/types` and `@just-monorepo/utils` is available in `@just-monorepo/server` and can be used like this:

```ts
import { Request, Response } from 'express';

import { OrderDto } from '@just-monorepo/types'; // ← Here
import { times, validate } from '@just-monorepo/utils'; // ← And here

export const createOrder = async (request: Request, response: Response) => {
  const order: OrderDto = request.body;
```

One small ts-node caveat: to use sub-package dependencies enable this setting in local `tsconfig.json`:

```diff
@@ -6,4 +6,7 @@
      "outDir": "dist"
    },
    "files": ["src/index.ts"],
+   "ts-node": {
+     "transpileOnly": true
+   }
  }
```

Now server is set up and ready. It can be build by `build` command:

```sh
npm run build:server
```

Then it can be launched by `start` command:

```sh
npm run start
```

While developing it can be started in non-production watch mode:

```sh
npm run watch:server
```

## Client Sub-Package

**`@just-monorepo/client`** is client package. It's an example of front-end application for end users and will be built with React and Webpack.

To preapare client first install React packages:

```sh
npm install react react-dom
```

Then install development dependencies. Types comes first:

```sh
npm install --save-dev @types/react @types/react-dom
```

Then Webpack along with its plugins and other extras:

```sh
npm install --save-dev clean-webpack-plugin copy-webpack-plugin css-loader file-loader html-webpack-plugin mini-css-extract-plugin postcss-csso postcss-import postcss-loader ts-loader webpack webpack-cli webpack-dev-server webpack-merge
```

Like with server package, setup local dependencies manually by modifying client `package.json`:

```diff
@@ -22,10 +22,12 @@
    "types": "dist/index.d.ts",
    "main": "dist/index.js",
    "dependencies": {
+     "@just-monorepo/utils": "0.0.0",
      "react": "...",
      "react-dom": "..."
    },
    "devDependencies": {
+     "@just-monorepo/types": "0.0.0",
      "@types/react": "...",
      "@types/react-dom": "...",
      "clean-webpack-plugin": "...",
```

And link them:

```sh
npm install
```

Setup Webpack next. Like e.g. TypeScript its configuration should be splitten into base and local with specific paths (for sub-package). They are available here:

  - Base Webpack configuration: [`/webpack.config.js`](webpack.config.js)
  - Local Webpack configuration: [`/packages/client/webpack.config.js`](packages/client/webpack.config.js)

Due to React typed JSX (TSX files) integration `tsconfig.json` should now have `jsx` option along with new TSX entry point (`"src/index.tsx"`):

```diff
@@ -3,7 +3,8 @@
    "compilerOptions": {
      "baseUrl": ".",
      "rootDir": "src",
-     "outDir": "dist"
+     "outDir": "dist",
+     "jsx": "react"
    },
-   "files": ["src/index.ts"]
+   "files": ["src/index.tsx"]
  }
```

Next setup build and watch scripts. First comes client's `package.json`:

```diff
@@ -13,7 +13,8 @@
      "directory": "packages/client"
    },
    "scripts": {
-     "build": "tsc"
+     "build": "webpack --config-name build",
+     "watch": "webpack serve --config-name watch"
    },
    "files": [
      "dist"
```

Then in global one:

```diff
@@ -12,6 +12,7 @@
      "build:utils": "npm run build --prefix packages/utils",
      "build": "npm run build:client && npm run build:server && npm run build:types && npm run build:utils",
      "watch:server": "npm run watch --prefix packages/server",
+     "watch:client": "npm run watch --prefix packages/client",
      "start:server": "npm run start --prefix packages/server"
    },
    "devDependencies": {
```

And client sub-package is set up and ready. It can be built by `build` command:

```sh
npm run build:client
```

While developing it can be started in non-production watch mode:

```sh
npm run watch:client
```
