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
      placeholder: "tw_placeholder",
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
  placeholder: "tw_placeholder",
  config: "tailwind.config.js",
  globalCSS: "tailwind.global.css",
})
```
- `include` (string, required) - file matcher for Lit components
- `exclude` (string) - file exlude matcher for Lit components
- `placeholder` (string, required) - placeholder that replaces it to compiled tailwindcss in Lit components
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

## tailwind.global.css

```css
@tailwind base;
@tailwind component;
@tailwind utilities;
```

### Lit component file

Replace placeholder to compiled tailwindcss in Lit components that's specified `include` and `exclude` in `rollup.config.js`.

In this file css section, doesn't support and tailwild feature like `@tailwind`.
You need write `@tailwind` directive in `tailwind.global.css`.

```ts
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("simple-footer")
export class SimpleComponent extends LitElement {
  static styles = css`
  /* some css. but @tailwind need to write in "tailwind.global.css" */

  tw_placeholder`; // 👈 classes will be injected here

  render() {
    return html`<h1
      class="text-purple-400 md:text-red-400 md:hover:text-green-500"
    >
      Hello, world!
    </h1>`;
  }
}
```

## Thank you

This plugin original is https://github.com/mchasaegh/rollup-plugin-lit-tailwindcss
