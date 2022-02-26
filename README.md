# rollup-plugin-lit-tailwindcss3

[![npm version](https://badge.fury.io/js/rollup-plugin-lit-tailwindcss3.svg)](https://badge.fury.io/js/rollup-plugin-lit-tailwindcss3)

Inject tailwind v3 compiled CSS into Lit components.

This plugin original is https://github.com/mchasaegh/rollup-plugin-lit-tailwindcss

## rollup.config.js

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

## tailwind.config.js

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

## Lit component file

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
