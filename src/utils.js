import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

export const isString = val => typeof val === 'string';

export const printRow = (str, {
    color = 'green',
    lineDown = 1,
} = {}) => {
    console.log('');
    console.log(chalk[color].bold(str));
    lineDown && console.log('');
}

export const printError = str => {
    printRow(str, { color: 'red' });
}

export const isUndefined = value => typeof value === 'undefined';

export const log = (...args) => console.log.apply(this, args);

export const ensureDir = filePath => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    fs.mkdirSync(dirname);
    return ensureDir(dirname);
}

/**
 * Normalize JSON options
 * @param {Object} opts Options
 * @param {String} key Options name to normalize
 * @returns {Object}
 */
export const normalizeJsonOpt = (opts, key) => {
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

export const buildWebpackArgs = opts => {
    return {
        ...opts,
        babel: normalizeJsonOpt(opts, 'babel'),
        htmlWebpack: normalizeJsonOpt(opts, 'htmlWebpack'),
    }
}

export const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const isDir = exists && fs.statSync(src).isDirectory();

    if (isDir) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach((file) => {
            copyRecursiveSync(path.join(src, file), path.join(dest, file));
        });
    } else if (exists) {
        fs.copyFileSync(src, dest);
    }
};

export const rootResolve = val => path.resolve(process.cwd(), val);

export const babelConfig = (opts = {}) => ({
    presets: [
        [ '@babel/preset-env', {
            targets: opts.targets,
            // useBuiltIns: 'usage', // this makes the build much bigger
            // corejs: 3,
        } ]
    ],
    plugins: [ '@babel/plugin-transform-runtime' ],
})