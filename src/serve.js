import { printRow, buildWebpackArgs, log, normalizeJsonOpt } from './utils';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import chalk from 'chalk';

/**
 * Start up the development server
 * @param {Object} opts
 */
export default (opts = {}) => {
    printRow('Start the development server...');
    const { host, port } = opts;
    const isVerb = opts.verbose;
    const resultWebpackConf = {
        ...webpackConfig({ args: buildWebpackArgs(opts) }),
        ...normalizeJsonOpt(opts, 'webpack'),
    };
    const devServerConf = {
        ...resultWebpackConf.devServer,
        open: true,
        ...normalizeJsonOpt(opts, 'devServer'),
    };

    if (isVerb) {
        log(chalk.yellow('Server config:\n'), opts, '\n');
        log(chalk.yellow('Webpack config:\n'), resultWebpackConf, '\n');
        log(chalk.yellow('DevServer config:\n'), devServerConf, '\n');
    }

    const compiler = webpack(resultWebpackConf);
    const server = new webpackDevServer(compiler, devServerConf);
    const prot = `http${devServerConf.https ? 's' : ''}`;

    server.listen(port, host, () => {
        printRow(`Starting server on ${prot}://${host}:${port}`, { color: 'blue' });
    });
};