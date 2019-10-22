import chalk from 'chalk';

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