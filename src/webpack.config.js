import { babelConfig, rootResolve, isFunction, isObject, log } from './utils';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const dirCwd = process.cwd();
let plugins = [];

export default (opts = {}) => {
  const pkg = require(`${dirCwd}/package.json`);
  const { args, cmdOpts = {} } = opts;
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

  let config = {
    entry: path.resolve(dirCwd, args.entry),
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    optimization: {
      minimizer: [new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            evaluate: false, // Avoid breaking gjs scripts
          },
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
        globalObject: `typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this)`,
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: /src/,
          options: {
            ...babelConfig(args),
            cacheDirectory: true,
            ...args.babel,
          },
      }],
    },
    plugins: plugins,
  };

  // Try to load local webpack config
  const localWebpackPath = rootResolve('webpack.config.js');
  const localWebpackConf = fs.existsSync(localWebpackPath) ? require(localWebpackPath).default : 0;
  if (isFunction(localWebpackConf)) {
      const fnRes = localWebpackConf({ config });
      config = isObject(fnRes) ? fnRes : config;
  }

  cmdOpts.verbose && log(chalk.yellow('Webpack config:\n'), config, '\n');

  return config;
}
