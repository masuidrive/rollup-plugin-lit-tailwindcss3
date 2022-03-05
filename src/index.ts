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
  config: "tailwind.config.js",
  globalCSS: "tailwind.global.css",
};

function postcssTw(
  contentFile: string,
  tailwindConfig: any,
  css: string,
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

  return postcss(plugins).process(css, {
    from: undefined,
    to: undefined,
  });
}

function escapeCSS(css: string): string {
  return css.replace(/(["'`\\])/g, "\\$1");
}

export default function litTailwindcss(options: TailwindPluginOptions) {
  const opts = { ...defaultOptions, ...options };
  if (opts.placeholder) throw new Error('"placeholder" is discontinued');
  if (!opts.include) throw new Error('Both "include" options is required');
  if (!opts.globalCSS) throw new Error("globalCSS options is required");
  if (!existsSync(opts.globalCSS))
    throw new Error(`Can't find ${opts.globalCSS}`);
  const globalCSSString = readFileSync(opts.globalCSS, {
    encoding: "utf8",
  }).toString();

  if (!opts.config) throw new Error("config options is required");
  if (!existsSync(opts.config)) throw new Error(`Can't find ${opts.config}`);
  const tailwindConfig = require(resolve(opts.config));

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: "lit-tailwindcss3",

    transform(code: string, id: string) {
      if (!filter(id)) return;
      const cssMatcher = code.match(
        /css\s*`\s*(\/\/|\/\*+)\s*tailwindcss\s*(|\*\/)((?:[^\\`]+|\\.)*)`/
      );
      if (cssMatcher && cssMatcher[3]) {
        console.log("okko");

        return postcssTw(
          id,
          tailwindConfig,
          [globalCSSString, cssMatcher[3]].join("\n"),
          opts.postCSSPlugins ?? []
        ).then((result) => {
          if (result.css) {
            console.log("repkace");
            return code.replace(
              cssMatcher[0],
              `css\`${escapeCSS(result.css)}\``
            );
          }
          return null;
        });
      }
      return null;
    },
  };
}
