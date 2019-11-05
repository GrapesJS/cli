import {
    printRow,
    printError,
    buildWebpackArgs,
    normalizeJsonOpt,
    copyRecursiveSync,
    rootResolve,
    log,
} from './utils';
import webpack from 'webpack';
import fs from 'fs';
import webpackConfig from './webpack.config';
import { exec } from 'child_process';
import chalk from 'chalk';
import { promisify } from 'util';

const execp = promisify(exec);

export const buildLocale = async (opts = {}) => {
    if (!fs.existsSync(rootResolve('src/locale'))) return;
    printRow('Start building locale files...');

    await execp('rm -rf locale');

    const localDst = rootResolve('locale');
    copyRecursiveSync(rootResolve('src/locale'), localDst);

    // Create locale/index.js file
    let result = '';
    fs.readdirSync(localDst).forEach(file => {
        const name = file.replace('.js', '');
        result += `export { default as ${name} } from './${name}'\n`;
    });
    fs.writeFileSync(`${localDst}/index.js`, result);

    await execp('babel locale -d locale --copy-files --no-comments');
    printRow('Locale files building completed successfully!');
}

/**
 * Build the library files
 * @param {Object} opts
 */
export default (opts = {}) => {
    printRow('Start building the library...');
    const isVerb = opts.verbose;
    isVerb && log(chalk.yellow('Build config:\n'), opts, '\n');

    const buildWebpack = () => {
        return buildLocale(opts);
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
                printRow('Building completed successfully!');
        });
    };

    if (opts.patch) {
        isVerb && log(chalk.yellow('Patch the version'), '\n');
        exec('npm version --no-git-tag-version patch', buildWebpack);
    } else {
        buildWebpack();
    }
};