const test = require('ava');
const rollup = require('rollup');
const { getCode } = require('../helpers');
const litTailwindcss = require('..');

process.chdir(__dirname);

test('processes lit component', async (t) => {
  const bundle = await rollup.rollup({
    input: 'fixtures/component.js',
    plugins: [
      litTailwindcss({
        include: 'fixtures/component.js',
        placeholder: 'tw_placeholder',
      }),
    ],
  });

  t.snapshot(await getCode(bundle));
});
