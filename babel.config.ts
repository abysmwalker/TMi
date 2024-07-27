import type { BabelConfig } from '@babel/core';

const config: BabelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};

export default config;
