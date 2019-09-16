import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import { exec } from 'child_process';
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

const buildWebpackArgs = opts => {
    return {
        ...opts,
        babel: normalizeJsonOpt(opts, 'babel'),
        htmlWebpack: normalizeJsonOpt(opts, 'htmlWebpack'),
    }
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

/**
 * Build the library files
 * @param {Object} opts
 */
export const build = (opts = {}) => {
    printRow('Start building the library...');
    const isVerb = opts.verbose;
    isVerb && log(chalk.yellow('Build config:\n'), opts, '\n');

    const buildWebpack = () => {
        const buildConf = {
            ...webpackConfig({
                production: 1,
                args: buildWebpackArgs(opts),
            }),
            ...normalizeJsonOpt(opts, 'config'),
        };

        isVerb && log(chalk.yellow('Webpack config:\n'), buildConf, '\n');
        webpack(buildConf, (err, stats) => {
            const errors = err || stats.hasErrors();
            const statConf = {
                hash: false,
                colors: true,
                builtAt: false,
                entrypoints: false,
                modules: false,
                ...normalizeJsonOpt(opts, 'stats'),
            };

            isVerb && log(chalk.yellow('Stats config:\n'), statConf, '\n');
            const result = stats.toString(statConf);
            log(result, '\n');

            errors ?
                printError('Error during building') :
                printRow('Building completed successfully');
        });
    };

    if (opts.patch) {
        isVerb && log(chalk.yellow('Patch the version'), '\n');
        exec('npm version --no-git-tag-version patch', buildWebpack);
    } else {
        buildWebpack();
    }
};

export default {
    serve,
    build,
}