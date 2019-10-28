const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
  const banner = `/*! ${name} - ${pkg.version} */`;

  if (!isProd) {
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
    optimization: {
      minimizer: [new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            quote_style: 3, // Preserve original quotes
            preamble: banner, // banner here instead of BannerPlugin
          }
        }
      })],
    },
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
