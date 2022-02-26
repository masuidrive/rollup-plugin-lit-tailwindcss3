import { createFilter, FilterPattern } from "@rollup/pluginutils";
import postcss, { Plugin } from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

interface TailwindPluginOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  placeholder?: string;
  config?: string;
  globalCSS?: string;
  postCSSPlugins?: Plugin[];
}

const defaultOptions: TailwindPluginOptions = {
  // include: undefined,
  // exclude: undefined,
  // placeholder: undefined,
  config: "tailwind.config.js",
  globalCSS: "tailwind.global.css",
};

function postcssTw(
  contentFile: string,
  tailwindConfig: any,
  globalCSS: string,
  postCSSPlugins: Plugin[]
) {
  const plugins = [
    tailwindcss({
      ...tailwindConfig,
      mode: "jit",
      content: [contentFile],
    } as any),
    autoprefixer,
    ...postCSSPlugins,
  ];

  return postcss(plugins).process(globalCSS, {
    from: undefined,
    to: undefined,
  });
}

function escapeCSS(css: string): string {
  return css.replace(/([:"'`])/g, "\\$1");
}

export default function litTailwindcss(options: TailwindPluginOptions) {
  const opts = { ...defaultOptions, ...options };
  if (!opts.include || !opts.placeholder)
    throw new Error('Both "include", "placeholder" options are required');

  if (!opts.globalCSS) throw new Error("globalCSS options is required");
  if (!existsSync(opts.globalCSS))
    throw new Error(`Can't find ${opts.globalCSS}`);
  const css = readFileSync(opts.globalCSS, {
    encoding: "utf8",
  }).toString();

  if (!opts.config) throw new Error("config options is required");
  if (!existsSync(opts.config)) throw new Error(`Can't find ${opts.config}`);
  const tailwindConfig = require(resolve(opts.config));

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: "lit2-tailwindcss3",

    transform(code: string, id: string) {
      if (!filter(id)) return;
      if (opts.placeholder && code.includes(opts.placeholder)) {
        return postcssTw(
          id,
          tailwindConfig,
          css,
          opts.postCSSPlugins ?? []
        ).then((result) => {
          if (result.css) {
            return code.replace(opts.placeholder!, escapeCSS(result.css));
          }
          return null;
        });
      }
      return null;
    },
  };
}
