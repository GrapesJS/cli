const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dirCwd = process.cwd();
const pkg = require(`${dirCwd}/package.json`);
let plugins = [];

module.exports = (opts = {}) => {
  const name = pkg.name;
  const isProd = opts.production;

  if (isProd) {
    plugins = [
      new webpack.BannerPlugin(`${name} - ${pkg.version}`),
    ]
  } else {
    const index = `${dirCwd}/index.html`;
    const indexDev = `${dirCwd}/_index.html`;
    plugins.push(new HtmlWebpackPlugin({
      template: fs.existsSync(indexDev) ? indexDev : index,
    }));
  }

  return {
    entry: path.resolve(dirCwd, './src/entry'),
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(dirCwd),
        filename: `dist/${name}.min.js`,
        library: name,
        libraryTarget: 'umd',
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: /src/,
          options: { cacheDirectory: true },
      }],
    },
    plugins: plugins,
  };
}
