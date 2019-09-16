import yargs from 'yargs';
import { serve, build } from './main';

const webpackOptions = yargs => {
    yargs.positional('config', {
        describe: 'webpack configuration options',
        type: 'string',
        default: '{}',
    })
    .positional('babel', {
        describe: 'Babel configuration object',
        type: 'string',
        default: '{}',
    })
    .positional('targets', {
        describe: 'Browser targets in browserslist query',
        type: 'string',
        default: '> 0.25%, not dead',
    })
    .positional('entry', {
        describe: 'Library entry point',
        type: 'string',
        default: 'src/index',
    })
    .positional('output', {
        describe: 'Build destination directory',
        type: 'string',
        default: 'dist',
    })
}

export const createCommands = (yargs) => {
    return yargs
    .command(['serve [port]', 'server'], 'Start the server', (yargs) => {
        yargs
        .positional('devServer', {
            describe: 'webpack-dev-server options',
            type: 'string',
            default: '{}',
        })
        .positional('host', {
            alias: 'h',
            describe: 'Host to bind on',
            type: 'string',
            default: 'localhost',
        })
        .positional('port', {
            alias: 'p',
            describe: 'Port to bind on',
            type: 'number',
            default: 8080,
        })
        .positional('htmlWebpack', {
            describe: 'html-webpack-plugin options',
            type: 'string',
            default: '{}',
        })
        webpackOptions(yargs);
    }, (argv) => serve(argv))
    .command('build', 'Build the source', (yargs) => {
        yargs
        .positional('stats', {
            describe: 'Options for webpack Stats instance',
            type: 'string',
            default: '{}',
        })
        .positional('patch', {
            describe: 'Increase automatically the patch version',
            type: 'boolean',
            default: true,
        });
        webpackOptions(yargs);
    }, (argv) => build(argv))
    .options({
        verbose: {
            alias: 'v',
            description: 'Run with verbose logging',
            type: 'boolean', // boolean | number | string
            default: false,
        },
    })
    .recommendCommands()
}

export const argsToOpts = () => {
    const { argv } = createCommands(yargs);
    const result = { ...argv };
    delete result.$0;
    // delete result._;

    return result;
};

export default (opts = {}) => {
    let options = argsToOpts();
    if (!options._.length) yargs.showHelp();

    // TODO no commands, .showHelp("log")
    // console.log(args, options);
}