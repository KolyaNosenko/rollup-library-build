const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const { eslint } = require('rollup-plugin-eslint');

const pkg = require('./package.json');

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
];

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

const extensions = ['.ts'];
const noDeclarationFiles = { compilerOptions: { declaration: false } };

module.exports = [
  // CommonJS
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup-lib.cjs.js',
      format: 'cjs',
      indent: false,
    },
    external: makeExternalPredicate(external), // prevent including node modules
    plugins: [
      nodeResolve(),
      commonjs(),
      eslint({
        throwOnError: true,
      }), // run linter only once
      typescript({
        useTsconfigDeclarationDir: true, // output .d.ts in dir specified inside tsconfig
        clean: true, // wipes out cache on every build
        typescript: require('typescript'), // prevent version incompatibility with plugin
      }),
      babel({
        configFile: false,
        extensions, // required for transpile .ts
        // Override babel config for diff targets
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              exclude: [
                'transform-async-to-generator',
                'transform-regenerator',
              ],
              targets: 'maintained node versions',
            },
          ],
        ],
        plugins: [['@babel/plugin-transform-runtime']],
        babelHelpers: 'runtime',
      }),
    ],
  },
  // ES
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup-lib.es.js',
      format: 'es',
    },
    external: makeExternalPredicate(external),
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfigOverride: noDeclarationFiles, // generate types only once for 'cjs'
        clean: true, // wipes out cache on every build
        typescript: require('typescript'), // prevent version incompatibility with plugin
      }),
    ],
  },
  // UMD
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup-lib.js',
      format: 'umd',
      name: 'RollupLib',
      indent: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfigOverride: noDeclarationFiles, // generate types only once for 'cjs'
        clean: true, // wipes out cache on every build
        typescript: require('typescript'), // prevent version incompatibility with plugin
      }),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      // replace({
      //   'process.env.NODE_ENV': JSON.stringify('production'),
      // }),
    ],
  },
  // UMD minified
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup-lib.min.js',
      format: 'umd',
      name: 'RollupLib',
      indent: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfigOverride: noDeclarationFiles, // generate types only once for 'cjs'
        clean: true, // wipes out cache on every build
        typescript: require('typescript'), // prevent version incompatibility with plugin
      }),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },
];
