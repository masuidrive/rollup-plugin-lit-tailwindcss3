import { createFilter } from "@rollup/pluginutils";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

function postcssTw(purgeFile: string) {
  const plugins = [
    tailwindcss({
      // mode: "jit",
      theme: {},
      purge: [purgeFile],
    }),
    autoprefixer,
  ];
  return postcss(plugins).process("@tailwind utilities;", {
    from: undefined,
    to: undefined,
  });
}

const defaultOptions = {
  include: undefined,
  exclude: undefined,
  placeholder: undefined,
};

export default function litTailwindcss(options = defaultOptions) {
  if (!options.include || !options.placeholder) {
    throw new Error('Both "include" & "placeholder" options are required');
  }
  const filter = createFilter(options.include, options.exclude);

  return {
    name: "lit-tailwindcss",

    transform(code: string, file: string) {
      if (!filter(file)) return;
      if (options.placeholder && code.includes(options.placeholder)) {
        return postcssTw(file).then((result) => {
          if (result.css) {
            return code.replace(
              options.placeholder!,
              result.css.replace(/:/g, "\\:")
            );
          }
          return null;
        });
      }
      return null;
    },
  };
}
