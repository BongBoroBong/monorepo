const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const CracoItkPlugin = require('craco-itk');

const vtkPath = path.join(__dirname, '../vtk-module');
const componentPath = path.join(__dirname, '../component-module');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
            ? match.loader.include
            : [match.loader.include];
        match.loader.include = include.concat[vtkPath, componentPath];
      }
      return webpackConfig;
    },
  },
  plugins:[
    {plugin:CracoItkPlugin()}
  ]
};
