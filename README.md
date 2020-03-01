# GrapesJS CLI

[![npm](https://img.shields.io/npm/v/grapesjs-cli.svg)](https://www.npmjs.com/package/grapesjs-cli) <span><a href="https://david-dm.org/artf/grapesjs-cli#info=dependencies"><img src="https://img.shields.io/david/artf/grapesjs-cli.svg" alt="Dependency Status" /></a></span>

![grapesjs-cli](https://user-images.githubusercontent.com/11614725/67523496-0ed41300-f6af-11e9-9850-7175355f2946.jpg)


A simple CLI library for helping in GrapesJS plugin development.

The goal of this package is to avoid the hassle of setting up all the dependencies and configurations for the plugin development by centralizing and speeding up the necessary steps during the process.

* Fast project scaffolding
* No need to touch Babel and Webpack configurations





## Plugin from 0 to 100

Create a production-ready plugin in a few simple steps.

* Create a folder for your plugin and init some preliminary steps

```sh
mkdir grapesjs-my-plugin
cd grapesjs-my-plugin
npm init -y
git init
```

* Install the package

```sh
npm i -D grapesjs-cli
```

* Init your plugin project by following few steps

```sh
npx grapesjs-cli init
```

You can also skip all the questions with `-y` option or pass all the answers via options (to see all available options run `npx grapesjs-cli init --help`)

```sh
npx grapesjs-cli init -y --user=YOUR-GITHUB-USERNAME
```


* The command will scaffold the `src` directory and a bunch of other files inside your project. The `src/index.js` will be the entry point of your plugin. Before starting developing your plugin run the development server and open the printed URL (eg. the default is http://localhost:8080)

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

* Once the development is finished you can build your plugin and generate the minified file ready for production

```sh
grapesjs-cli build
```

* Before publishing your package remember to complete your README.md file with all the available options, components, blocks and so on.
For a better user engagement create a simple live demo by using services like [JSFiddle](https://jsfiddle.net) [CodeSandbox](https://codesandbox.io) [CodePen](https://codepen.io) and link it in your README. To help you in this process we'll print all the necessary HTML/CSS/JS in your README, so it will be just a matter of copy-pasting on some of those services.





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
