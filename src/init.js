import inquirer from 'inquirer';
import { printRow, printError, isUndefined } from './utils';
import path from 'path';

const getName = str => str
    .replace(/\_/g, '-')
    .split('-')
    .filter(i => i)
    .map(i => i[0].toUpperCase() + i.slice(1))
    .join(' ');

export const initPlugin = (opts = {}) => {
    printRow('Start file creation...');
    // File creation
        // Add .gitignore if doesn't exists yet
        // Check also package.json if exists
    // Package.json update
}

export default async (opts = {}) => {
    printRow('Init the project...');
    const rootDir = path.basename(process.cwd());
    const {
        verbose,
        name,
        rName,
        user,
        yes,
        components,
        blocks,
    } = opts;
    let results = {
        name: name || getName(rootDir),
        rName: rName || rootDir,
        user: user || 'YOUR-USERNAME',
        components: components || true,
        blocks: blocks || true,
    };

    // Will you need to add Custom Component Types? [yes]
    // Will you need to add Blocks? [yes]
    const questions = [];

    if (!yes) {
        !name && questions.push({
            name: 'name',
            message: 'Name of the project',
            default: results.name,
        });
        !rName && questions.push({
            name: 'rName',
            message: 'Repository name (used also as the plugin name)',
            default: results.rName,
        });
        !user && questions.push({
            name: 'user',
            message: 'Repository username (eg. on GitHub/Bitbucket)',
            default: results.user,
        });
        isUndefined(components) && questions.push({
            type: 'boolean',
            name: 'components',
            message: 'Will you need to add custom Component Types?',
            default: results.components,
        });
        isUndefined(blocks) && questions.push({
            type: 'boolean',
            name: 'blocks',
            message: 'Will you need to add Blocks?',
            default: results.blocks,
        });
    }

    const answers = await inquirer.prompt(questions);
    results = {
        ...results,
        ...answers,
    }

    initPlugin(results);
}