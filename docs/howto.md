# How To

> *This document describes how to create a similar monorepository by using just a NPM workspaces feature.*

## Step 1. Initialization

Create a new directory that will be a root for a new monorepository. In this article it's supposed that root directory is `just-monorepo`.

```sh
mkdir just-monorepo
```

Switch to created directory and initialize a new git repository then:

```sh
cd just-monorepo
git init
```

Initialize a new NPM package that will be a root package:

```sh
npm init --yes
```

Enable workspaces in previously created package so it become a root meta-package for real sub-packages. To do so, clean up created root `package.json` and make it look like this:

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

Here `"workspaces"` property lists directories of actual sub-packages. [See details in NPM docs.](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

There is no "common" or "best" packages structure. Sometimes it's better to use flat structure of just `packages/*` directory while sometimes it can be split up to `apps/*`, `libs/*`, `<etc>/*` and so on. In order to provide simple example this monorepo will use flat option.

Create the following structure:

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

Each sub-package is just a subdirectory with its own `package.json`:

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

Now it's ready: blank monorepo with 4 sub-packages is created.

## Step 2. Integrating TypeScript

Types and data contracts are essential for large realworld projects. For JavaScript projects one can use TypeScript which can be simply integrated by installing its package first.

In root directory:

```sh
npm install --save-dev typescript
```

To compile TypeScript create a `tsconfig.json` configuration, for each sub-package and for root package too:

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

Root [`tsconfig.json`](tsconfig.json) will contain configuration base:

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

Then `package.json` of each sub-package should now contain following properties:

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

Each sub-package should now have an entry point file `src/index.ts`. It could be empty for now:

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

Also, root [`package.json`](package.json) should now have global building scripts:

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
+     "build": "npm run build:types && npm run build:utils && npm run build:server && npm run build:client"
+   },
+   "devDependencies": {
+     "typescript": "..."
+   }
```

Note a building order: `@just-monorepo/types` should be built first since all the packages needs it and so on.

Now it's done: monorepository supports TypeScript.

One can now build any package by running:

```sh
npm run build:<package>
```

For instance:

```sh
npm run build:types
```

Or build them all at once:

```sh
npm run build
```

## Step 3. Integrating Server Dependencies (Express and Others)

For server sub-packages (like `@just-monorepo/server`) there should be some server infrastructure, like Express for instance.

Server dependencies (Express) are potentially may be utilized by multiple server sub-packages so install them in root package. In root directory:

```sh
npm install cors express
```

Then development packages:

```sh
npm install --save-dev @types/cors @types/express node-dev ts-node
```

One note for server sub-packages configuration: to use local sub-package dependencies use this in root [`tsconfig.json`](tsconfig.json):

```diff
@@ -15,5 +15,8 @@
    },
    "paths": {
      "*": ["node_modules/*"]
+   },
+   "ts-node": {
+     "transpileOnly": true
    }
  }
```

Next, setup watch and start scripts in [`package.json`](packages/server/package.json) of `@just-monorepo/server`:

```diff
@@ -13,7 +13,9 @@
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
```

And for root [`package.json`](package.json) too:

```diff
@@ -10,9 +10,19 @@
      "build:server": "npm run build --prefix packages/server",
      "build:types": "npm run build --prefix packages/types",
      "build:utils": "npm run build --prefix packages/utils",
-     "build": "npm run build:types && npm run build:utils && npm run build:server && npm run build:client"
+     "build": "npm run build:types && npm run build:utils && npm run build:server && npm run build:client",
+     "watch:server": "npm run watch --prefix packages/server",
+     "start:server": "npm run start --prefix packages/server"
    },
    "devDependencies": {
+     "@types/cors": "...",
+     "@types/express": "...",
+     "node-dev": "...",
+     "ts-node": "...",
      "typescript": "..."
+   },
+   "dependencies": {
+     "cors": "...",
+     "express": "..."
    }
  }
```

Now it's done: monorepository has global Express support for any server sub-package.

Also, `@just-monorepo/server` is set up and ready. It can be built by `build` command:

```sh
npm run build:server
```

Then it can be launched by `start` command:

```sh
npm run start
```

While developing it can be started in non-production live-reload mode:

```sh
npm run watch:server
```

## Step 4. Integrating Client Dependencies (Webpack and Others)

For client sub-packages (like `@just-monorepo/client`) there should be some client bundling infrastructure, like Webpack bundling for instance.

Client dependencies (Webpack and plugins) are potentially may be utilized by multiple sub-packages so install them in root package. They are all goes as development dependencies:

```sh
npm install --save-dev clean-webpack-plugin copy-webpack-plugin css-loader file-loader html-webpack-plugin mini-css-extract-plugin postcss-csso postcss-import postcss-loader ts-loader webpack webpack-cli webpack-dev-server webpack-merge
```

Next, setup watch and build scripts in [`package.json`](packages/client/package.json) of `@just-monorepo/client`:

```diff
@@ -13,7 +13,8 @@
      "directory": "packages/client"
    },
    "scripts": {
-     "build": "tsc",
+     "build": "webpack --config-name build",
+     "watch": "webpack serve --config-name watch"
    },
    "files": [
      "dist"
```

And for root [`package.json`](package.json) too:

```diff
@@ -12,14 +12,29 @@
      "build:utils": "npm run build --prefix packages/utils",
      "build": "npm run build:types && npm run build:utils && npm run build:server && npm run build:client",
      "watch:server": "npm run watch --prefix packages/server",
+     "watch:client": "npm run watch --prefix packages/client",
      "start:server": "npm run start --prefix packages/server"
    },
    "devDependencies": {
      "@types/cors": "...",
      "@types/express": "...",
+     "clean-webpack-plugin": "...",
+     "copy-webpack-plugin": "...",
+     "css-loader": "...",
+     "file-loader": "...",
+     "html-webpack-plugin": "...",
+     "mini-css-extract-plugin": "...",
      "node-dev": "...",
+     "postcss-csso": "...",
+     "postcss-import": "...",
+     "postcss-loader": "...",
+     "ts-loader": "...",
      "ts-node": "...",
-     "typescript": "..."
+     "typescript": "...",
+     "webpack": "...",
+     "webpack-cli": "...",
+     "webpack-dev-server": "...",
+     "webpack-merge": "..."
    },
    "dependencies": {
      "cors": "^2.8.5",
```

Setup Webpack configuration next. Like e.g. TypeScript its configuration should be split up to base and local ones with specific paths (for sub-package). They are available here:

  - [`/webpack.config.js`](webpack.config.js) — base Webpack configuration
  - [`/packages/client/webpack.config.js`](packages/client/webpack.config.js) — local (per package) Webpack configuration
  - *Note:* if there will be another client package it should have its own `webpack.config.js`

Now it's done. A monorepository has global Webpack support for any client sub-package.

Also, `@just-monorepo/client` is set up and ready. It can be built by `build` command:

```sh
npm run build:client
```

While developing it can be started in non-production live-reload mode:

```sh
npm run watch:client
```

## Step 5. Populating Sub-Packages and Utilizing Local Dependencies

### Populating Types Sub-Package

**`@just-monorepo/types`** is types and data contracts definitions sub-package. It will be consumed by other sub-packages, so it should be populated first.

Create some data contract definition that will be used later. In [`vehicles/vehicle.dto.ts`](packages/types/src/vehicles/vehicle.dto.ts):

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

### Populating Utilities Package

**`@just-monorepo/utils`** is generic utility functions sub-package which will be used both by client and server applications. Among others this sub-package provides validation utilities for `OrderDto` structure validation.

Since `OrderDto` interface is defined and exported in `@just-monorepo/types` sub-package it should be integrated into `@just-monorepo/utils` as a development dependency first.

Types sub-package is never published so it can be added only manually by editing `package.json` of `@just-monorepo/utils`:

```diff
@@ -19,5 +19,8 @@
      "dist"
    ],
    "types": "dist/index.d.ts",
-   "main": "dist/index.js"
+   "main": "dist/index.js",
+   "devDependencies": {
+     "@just-monorepo/types": "file:../types/dist"
+   }
  }
```

Now link it by running `install` from root directory:

```sh
npm install
```

After `install` ends `OrderDto` can be imported in `@just-monorepo/utils` code, e.g. in [`validate/is-valid-order.ts`](packages/utils/src/validate/is-valid-order.ts):

```ts
import { OrderDto } from '@just-monorepo/types'; // ← Here

import { isNumber } from './is-number';
import { isFullString } from './is-full-string';

export const isValidOrder = (order: OrderDto): boolean =>
  isInteger(order.vehicleId) &&
  isFullString(order.fullName) &&
  isFullString(order.contacts);
```

Note some caveats:

  - Every time when `@just-monorepo/types` code is changed it should be re-built to be available in other sub-packages. Same does for every dependency sub-package.
  - For Visual Studio Code users: use `Developer: Reload Window` command if local sub-packages dependency is not recognized (i.e. in TypeScript `import`s)

Now utilities sub-package is done. Build it by using command from root directory:

```sh
npm run build:utils
```

### Populating Server Sub-Package

**`@just-monorepo/server`** is a server package. It will act like example of API server for client front-end applications.

Add local types and utilities sub-packages as dependencies, like in a section before:

```diff
@@ -21,5 +21,11 @@
      "dist"
    ],
    "types": "dist/index.d.ts",
-   "main": "dist/index.js"
+   "main": "dist/index.js",
+   "dependencies": {
+     "@just-monorepo/utils": "file:../utils/dist"
+   },
+   "devDependencies": {
+     "@just-monorepo/types": "file:../types/dist"
+   }
  }
```

Then link them by running `install` from root directory:

```sh
npm install
```

Now any exported code from `@just-monorepo/types` and `@just-monorepo/utils` is available in `@just-monorepo/server` and can be used like in [`src/orders/handlers.ts`](packages/server/src/orders/handlers.ts):

```ts
import { Request, Response } from 'express';

import { OrderDto } from '@just-monorepo/types'; // ← Here
import { times, validate } from '@just-monorepo/utils'; // ← And there

export const createOrder = async (
  request: Request,
  response: Response
): Promise<void> => {
  // <...>
};
```

Now `@just-monorepo/server` is populated.

### Populating Client Sub-Package

**`@just-monorepo/client`** is a client package. It's an example of front-end application for end users and will be built with React and Webpack.

Webpack was installed and set up as global dependency already since it's potentially may be used by multiple frontend applications. Unlike Webpack, assume that React will be used only in `@just-monorepo/client` (another client packages may be built with Angular, Vue.js or other technologies).

First install React packages:

```sh
npm install --workspace=packages/client react react-dom
```

Then install development dependencies:

```sh
npm install --workspace=packages/client --save-dev @types/react @types/react-dom
```

Like with server package, setup local dependencies manually by modifying client [`package.json`](packages/client/package.json)`:

```diff
@@ -22,10 +22,12 @@
    "types": "dist/index.d.ts",
    "main": "dist/index.js",
    "dependencies": {
+     "@just-monorepo/utils": "../utils/dist",
      "react": "...",
      "react-dom": "..."
    },
    "devDependencies": {
+     "@just-monorepo/types": "../types/dist",
      "@types/react": "...",
      "@types/react-dom": "..."
    }
```

And link them:

```sh
npm install
```

Due to React typed JSX (TSX files) integration local [`tsconfig.json`](packages/client/tsconfig.json) should now have `jsx` option along with new TSX entry point (`"src/index.tsx"`):

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

Now `@just-monorepo/client` is populated.

### Documentation (Optional)

Integrated documentation to TypeScript code can be easily added by using JSDoc syntax ([see more](https://jsdoc.app/)). Just add special entry to annotate a code block, i.e. in `@just-monorepo/utils` code, [`validate/is-valid-order.ts`](packages/utils/src/validate/is-valid-order.ts):

```ts
/**
 * Returns true if Order is valid, i.e:
 *
 *   - Has a `vehicleId` property which is valid integer number
 *   - Has a `fullName` property which is valid non-empty string
 *   - Has a `contacts` property which is valid non-empty string
 * @param order
 */
export const isValidOrder = (order: OrderDto): boolean =>
  isInteger(order.vehicleId) &&
  isFullString(order.fullName) &&
  isFullString(order.contacts);
```

After `build` command this annotation will be available in external packages, i.e. in `@just-monorepo/server` which utilizes `@just-monorepo/utils`.
