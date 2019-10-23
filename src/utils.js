import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

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