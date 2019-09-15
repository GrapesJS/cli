import yargs from 'yargs';

export const createCommands = (yargs) => {
    return yargs
    .command('serve [port]', 'Start the server', (yargs) => {
        // yargs.positional('port', {
        //     describe: 'port to bind on',
        //     default: 5000
        // });
        yargs.positional('path', {
            alias: 'pa',
            describe: 'Path to server',
            default: 8080,
        })
    }
    /*{
        port: {
            alias: 'p',
            describe: 'Port to bind on',
            default: 8080,
        }
    }*/, (argv) => {
        if (argv.verbose) console.info(`start server on :${argv.port}`)
        serve(argv.port)
    }).option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    }).options({
        port: {
            alias: 'p',
            describe: 'Port to bind on',
            type: 'number', // boolean | number | string
            default: 8080,
        },
    })
    .recommendCommands()
    .showHelp("log")
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
    // console.log(args, options);
}