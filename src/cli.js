import yargs from 'yargs';
import { serve } from './main';

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
    }, (argv) => serve(argv))
    .command('build', 'Build the source', (yargs) => {
        // yargs.positional('path', {
        //     alias: 'pa',
        //     describe: 'Path to server',
        //     default: 8080,
        // })
    }, (argv) => serve(argv))
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
    // delete result._;
    // delete result.$0;

    return result;
};

export default (opts = {}) => {
    let options = argsToOpts();
    if (!options._.length) yargs.showHelp();

    // TODO no commands, .showHelp("log")
    // console.log(args, options);
}