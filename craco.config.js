const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const CracoAlias = require('craco-alias');
const CracoItkPlugin = require('craco-itk');

const vtkPath = path.join(__dirname, '../vtk-module');
const componentPath = path.join(__dirname, '../component-module');

module.exports = {
  webpack: {
    mode: 'production',
    optimization: {
      optimization: {
        minimize: true,
        minimizer: [
          (compiler) => {
            const TerserPlugin = require('terser-webpack-plugin');
            new TerserPlugin({
              terserOptions: {
                compress: {},
              },
            }).apply(compiler);
          },
        ],
      },
    },
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[(vtkPath, componentPath)];
      }
      return webpackConfig;
    },
  },
  babel: {
    presets: [
      ['@babel/preset-env', { loose: true }],
      ['@babel/preset-react', { absoluteRuntime: false }],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
        },
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.json',
      },
    },
    {
      plugin: CracoItkPlugin(),
    },
  ],
};
