import {
    printRow,
    printError,
    buildWebpackArgs,
    normalizeJsonOpt,
    copyRecursiveSync,
    rootResolve,
    babelConfig,
    log,
} from './utils';
import webpack from 'webpack';
import fs from 'fs';
import webpackConfig from './webpack.config';
import { exec } from 'child_process';
import chalk from 'chalk';
import { promisify } from 'util';
import { transformFileSync } from '@babel/core';

const execp = promisify(exec);

export const buildLocale = async (opts = {}) => {
    if (!fs.existsSync(rootResolve('src/locale'))) return;
    printRow('Start building locale files...', { lineDown: 0 });

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

    // Compile files
    const babelOpts = {
        ...babelConfig(buildWebpackArgs(opts)),
        babelrc: false,
        configFile: false,
    };
    fs.readdirSync(localDst).forEach(file => {
        const filePath = `${localDst}/${file}`;
        const compiled = transformFileSync(filePath, babelOpts).code;
        console.log('COMPILE: ', filePath);
        fs.writeFileSync(filePath, compiled);
    });

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
        const buildConf = {
            ...webpackConfig({
                production: 1,
                args: buildWebpackArgs(opts),
            }),
            ...normalizeJsonOpt(opts, 'config'),
        };

        isVerb && log(chalk.yellow('Webpack config:\n'), buildConf, '\n');
        webpack(buildConf, async (err, stats) => {
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
            await buildLocale(opts);

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