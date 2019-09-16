const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dirCwd = process.cwd();
let plugins = [];

module.exports = (opts = {}) => {
  const pkg = require(`${dirCwd}/package.json`);
  const { args } = opts;
  const { htmlWebpack = {} } = args;
  const name = pkg.name;
  const isProd = opts.production;

  if (isProd) {
    plugins = [
      new webpack.BannerPlugin(`${name} - ${pkg.version}`),
    ]
  } else {
    const fname = 'index.html';
    const index = `${dirCwd}/${fname}`;
    const indexDev = `${dirCwd}/_${fname}`;
    let template = path.resolve(__dirname, `./../${fname}`);

    if (fs.existsSync(indexDev)) {
      template = indexDev;
    } else if (fs.existsSync(index)) {
      template = index;
    }

    plugins.push(new HtmlWebpackPlugin({
      inject: 'head',
      template,
      ...htmlWebpack,
      templateParameters: {
        name,
        title: name,
        gjsVersion: 'latest',
        pathGjs: '',
        pathGjsCss: '',
        ...htmlWebpack.templateParameters || {},
      },
    }));
  }

  return {
    entry: path.resolve(dirCwd, args.entry),
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(dirCwd, args.output),
        filename: `${name}.min.js`,
        library: name,
        libraryTarget: 'umd',
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: /src/,
          options: {
            presets: [
              [ require('@babel/preset-env'), {
                targets: args.targets,
                // useBuiltIns: 'usage', // this makes the build much bigger
                // corejs: 3,
              } ]
            ],
            plugins: [ require('@babel/plugin-transform-runtime') ],
            cacheDirectory: true,
            ...args.babel,
          },
      }],
    },
    plugins: plugins,
  };
}
