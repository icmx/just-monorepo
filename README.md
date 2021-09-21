# Just Monorepo

## Usage

Clone this repository:

```sh
git clone https://github.com/icmx/just-monorepo
```

Go to local saved copy:

```sh
cd just-monorepo
```

Install dependencies — please see notes below:

```sh
npm install
```

*Note:* this project is built on npm workspaces feature and thus requires npm v7 or higher. If you haven't one, there are some options:

  - Install Node.js v15 or higher — npm is icluded
  - Manually install npm v7 or higher:
    - Globally, by running `npm install --global npm@latest`
    - Locally for project, by running `npm install --save-dev npm@latest`
  - **(the simplest one)** run npm v7 directly by using npx: `npx npm@latest <npm-commands...>`

Build it:

```sh
npm run build
```
