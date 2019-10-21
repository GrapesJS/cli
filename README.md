# GrapesJS CLI

<span><a href="https://david-dm.org/artf/grapesjs-cli#info=dependencies"><img src="https://img.shields.io/david/artf/grapesjs-cli.svg" alt="Dependency Status" /></a></span>


Simple CLI library for helping in GrapesJS plugin development.
The goal of this package is to avoid the hassle of setting up all the necessary dependencies and configurations by centralizing all the processes to create a GrapesJS plugin





## Plugin from 0 to 100 (DRAFT: NOT ALL STEPS ARE READY)

Create a production-ready plugin in a few simple steps.

1. Create a folder for your plugin and init some preliminary steps

```sh
mkdir grapesjs-my-plugin
cd grapesjs-my-plugin
npm init -y
git init
```

1. Install the package

```sh
npm i -D grapesjs-cli
```

1. [TODO] Init your plugin project by following few steps

```sh
npx grapesjs-cli init
```

You can also skip all the questions with `-y` option

```sh
npx grapesjs-cli init -y
```

1. The directory `src` will be created with few files inside and `index.js` will be the entry point of your plugin. Before starting developing your plugin run the development server and follow the printed URL (eg. default is http://localhost:8080)

```sh
npx grapesjs-cli serve
```

If you need a custom port use the `-p` option

```sh
npx grapesjs-cli serve -p 8081
```

Under the hood we use `webpack-dev-server` and you can pass its option via CLI in this way

```sh
npx grapesjs-cli serve --devServer='{"https": true}'
```

1. Once the development is finished you can build your plugin for production

```sh
grapesjs-cli build
```





## Generic CLI usage

Show all available commands

```sh
grapesjs-cli
```

Show available options for a command

```sh
grapesjs-cli COMMAND --help
```

Run the command

```sh
grapesjs-cli COMMAND --OPT1 --OPT2=VALUE
```





## License

MIT
