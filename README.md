# GrapesJS Dev Helper

Simple CLI library for helping in GrapesJS plugin development.
The goal of this package is to avoid the hassle of setting up all the necessary dependencies and configurations by centralizing all the processes necessary to create a GrapesJS plugin





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
npm i -D grapesjs-dev-helper
```

1. [TODO] Init your plugin project by following few steps

```sh
npx grapesjs-dev-helper init
```

You can also skip all the questions with `-y` option

```sh
npx grapesjs-dev-helper init -y
```

1. [TODO] The directory `src` will be created with few files inside and `index.js` is the entry point of your plugin. Before starting developing your plugin run the development server and follow the printed URL (eg. default is http://localhost:8080)

```sh
npx grapesjs-dev-helper serve
```

If you need a custom port use the `-p` option

```sh
npx grapesjs-dev-helper serve -p 8081
```

Under the hood we use `webpack-dev-server` and you can pass its option via CLI in this way

```sh
npx grapesjs-dev-helper serve --devServer='{"https": true}'
```

1. Once the development is finished you can build your plugin for production

```sh
grapesjs-dev-helper build
```





## Generic usage

Generic CLI usage

```sh
grapesjs-dev-helper COMMAND --OPT1 --OPT2=VALUE
```

Generic help for a command

```sh
grapesjs-dev-helper COMMAND --help
```

Show all available commands

```sh
grapesjs-dev-helper
```





## License

BSD 3-Clause
