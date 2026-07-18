# Clearline

Designed for readability — **Clearline-Dark**, **Clearline-Grey**, and **Clearline-Slate**.

**Preview:** [tom0411.github.io/clearline](https://tom0411.github.io/clearline/)

## Install (npm)

```bash
npm install clearline
```

## Usage

```js
import dark from 'clearline/dark';
import grey from 'clearline/grey';
import slate from 'clearline/slate';

// or default export (Clearline Dark)
import dark from 'clearline';
```

CommonJS:

```js
const dark = require('clearline/dark');
const grey = require('clearline/grey');
const slate = require('clearline/slate');
```

Each import is the full VS Code theme JSON (`colors`, `tokenColors`, etc.).

## VS Code / Cursor

Install the extension from the Marketplace, or from a local VSIX:

```bash
code --install-extension clearline-1.1.5.vsix
```

## Publish to npm

```bash
npm login
npm publish
```

## Credits

Based on [ChatGP-Theme](https://github.com/0xJariel/ChatGP-Theme)

Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Renamed to Clearline

Vibe code with Cursor Grok 4.5
