import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import chalk from 'chalk';

const printRow = (str, { color = 'green' } = {}) => {
    console.log('');
    console.log(chalk[color].bold(str));
    console.log('');
}

const printError = (str) => {
    printRow(str, { color: 'red' });
}

const log = (...args) => console.log.apply(this, args);
const isString = val => typeof val === 'string';

/**
 * Normalize JSON options
 * @param {Object} opts Options
 * @param {String} key Options name to normalize
 * @returns {Object}
 */
const normalizeJsonOpt = (opts, key) => {
    let devServerOpt = opts[key] || {};

    if (isString(devServerOpt)) {
        try {
            devServerOpt = JSON.parse(devServerOpt);
        } catch (e) {
            printError(`Error while parsing "${key}" option`);
            printError(e);
            devServerOpt = {}
        }
    }

    return devServerOpt;
}

/**
 * Start up the development server
 * @param {Object} opts
 */
export const serve = (opts = {}) => {
    printRow('Start the development server...');
    const { host, port } = opts;
    const isVerb = opts.verbose;
    const resultWebpackConf = {
        ...webpackConfig(),
        ...normalizeJsonOpt(opts, 'webpack'),
    };
    const devServerConf = {
        ...resultWebpackConf.devServer,
        ...normalizeJsonOpt(opts, 'devServer'),
    };

    if (isVerb) {
        log(chalk.yellow('Server config:\n'), opts, '\n');
        log(chalk.yellow('Webpack config:\n'), resultWebpackConf, '\n');
        log(chalk.yellow('DevServer config:\n'), devServerConf, '\n');
    }

    const compiler = webpack(webpackConfig());
    const server = new webpackDevServer(compiler, devServerConf);
    const prot = `http${devServerConf.https ? 's' : ''}`;

    server.listen(port, host, () => {
        printRow(`Starting server on ${prot}://${host}:${port}`, { color: 'blue' });
    });
};

/**
 * Build the library files
 * @param {Object} opts
 */
export const build = (opts = {}) => {
    printRow('Start building the library...');
    const isVerb = opts.verbose;
    const buildConf = {
        ...webpackConfig({ production: 1 }),
        ...normalizeJsonOpt(opts, 'build'),
    };

    if (isVerb) {
        log(chalk.yellow('Webpack config:\n'), buildConf, '\n');
    }


    webpack(buildConf, (err, stats) => {
        if (err || stats.hasErrors()) {
            printError('Error during building');
            printError(err);
        }

        const result = stats.toString({ colors: true });
        log(result);
    });
};

export default {
    serve,
    build,
}