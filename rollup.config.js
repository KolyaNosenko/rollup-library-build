const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require("rollup-plugin-terser");

const pkg = require('./package.json');

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
];

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
}

// TODO should need source maps??
// TODO add cleaning
module.exports = [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'dist/rollup-lib.cjs.js',
      format: 'cjs',
      indent: false
    },
    external: makeExternalPredicate(external),
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        plugins: [
          ['@babel/plugin-transform-runtime'],
        ],
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
      }),
    ]
  },
  // ES
  // TODO diff browserslistrc config
  {
    input: 'src/index.js',
    output: {
      file: 'dist/rollup-lib.es.js',
      format: 'es'
    },
    external: makeExternalPredicate(external),
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        plugins: [
          ['@babel/plugin-transform-runtime', { useESModules: true }],
        ],
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
      }),
    ]
  },
  // UMD
  {
    input: 'src/index.js',
    output: {
      file: 'dist/rollup-lib.js',
      format: 'umd',
      name: 'RollupLib',
      indent: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      // replace({
      //   'process.env.NODE_ENV': JSON.stringify('production'),
      // }),
    ]
  },
  // UMD minified
  {
    input: 'src/index.js',
    output: {
      file: 'dist/rollup-lib.min.js',
      format: 'umd',
      name: 'RollupLib',
      indent: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
    ]
  },
]
