# rollup-plugin-lit-tailwindcss3

[![npm version](https://badge.fury.io/js/rollup-plugin-lit-tailwindcss3.svg)](https://badge.fury.io/js/rollup-plugin-lit-tailwindcss3)

Inject tailwindcss v3 compiled CSS into Lit components.

```
npm install --save rollup-plugin-lit-tailwindcss3
```

## Requirements

- Lit v2.0 and later
- Tailwindcss v3.0 and later

## Usage

### rollup.config.js

```js
import litTailwind from "rollup-plugin-lit-tailwindcss3";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
  },
  plugins: [
    litTailwind({
      include: "src/components/**/*.ts",
      // exclude: "",
      // config: "tailwind.config.js",
      // globalCSS: "tailwind.global.css",
    }),
  ],
};
```

### Options

```
litTailwind({
  include: "src/components/**/*.ts",
  exclude: "**/data/*.ts",
  config: "tailwind.config.js",
  globalCSS: "tailwind.global.css",
})
```

- `include` (string, required) - file matcher for Lit components
- `exclude` (string) - file exlude matcher for Lit components
- `config` (string, default: `tailwind.config.js`) - `tailwind.config.js` path and filename
- `globalCSS` (string, default: `tailwind.global.css`) - filename of global css for tailwindcss

### tailwind.config.js

```js
module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

### tailwind.global.css

This file will be read before every tailwind compiling.
We recommend to set `@tailwind` directive in this file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Lit components file

Processes Lit components specified by `include` and `exclude` in `rollup.config.js`.
To use tailwindcss, put `// tailwindcss` in the first line of the css string.

```ts
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("simple-footer")
export class SimpleComponent extends LitElement {
  static styles = css`
    // tailwindcss
    // 👆 must set the above line on the first line of css string to use tailwindcss.
    .dummy {
      @apply text-red-500; // can use @apply and other tailwind derectives
    }
  `;

  render() {
    return html`<h1
      class="text-purple-400 md:text-red-400 md:hover:text-green-500"
    >
      Hello, world!
    </h1>`;
  }
}
```

## Changelog

See https://github.com/masuidrive/rollup-plugin-lit-tailwindcss3/releases/

## Thank you

This plugin original is https://github.com/mchasaegh/rollup-plugin-lit-tailwindcss
