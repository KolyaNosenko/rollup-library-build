import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';

import pkg from "./package.json";

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



module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/wallet-manager.cjs.js',
    format: 'cjs'
  },
  external: makeExternalPredicate(external),
  plugins: [
    resolve(),
    commonjs(),
    babel({
      plugins: [
        ['@babel/plugin-transform-runtime'],
      ],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    filesize()
  ]
}
