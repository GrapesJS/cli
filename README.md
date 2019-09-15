# GrapesJS Plugin Boilerplate


<span><a href="https://david-dm.org/artf/grapesjs-plugin-boilerplate#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/artf/grapesjs-plugin-boilerplate.svg" alt="Dev Dependency Status" /></a></span>

This boilerplate helps you quickly start a production ready plugin for GrapesJS. If you don't know from where to start, check this guide [Creating plugins](https://grapesjs.com/docs/modules/Plugins.html). Sections below are also used as boilerplate for your README, follow these steps below

### Usage
1. Clone this repository `git clone https://github.com/artf/grapesjs-plugin-boilerplate.git YOUR-PLUGIN-NAME`
1. Replace in all files `YOUR-PLUGIN-NAME` and `grapesjs-plugin-boilerplate` with your plugin name.
  **The name of your plugin depends on the `name` key in your `package.json`**
1. Update all the data in `package.json`
1. Install dependencies `npm i` and run the local server `npm start`
1. Start creating your plugin from `src/index.js`
1. Show some gif/demo if possible
1. Update README
1. When you're ready, build your source with `npm run build`
1. Publish




## Summary

* Plugin name: `YOUR-PLUGIN-NAME`
* Components
  * `new-component1`
  * `new-component2`
* Blocks
  * `new-block1`
  * `new-block1`
...





## Options

|Option|Description|Default|
|-|-|-
|`option1`|Description option|`default value`|





## Download

* CDN
  * `https://unpkg.com/YOUR-PLUGIN-NAME`
* NPM
  * `npm i YOUR-PLUGIN-NAME`
* GIT
  * `git clone https://github.com/YOUR-NAME/YOUR-PLUGIN-NAME.git`





## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/YOUR-PLUGIN-NAME.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      // ...
      plugins: ['YOUR-PLUGIN-NAME'],
      pluginsOpts: {
        'YOUR-PLUGIN-NAME': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import yourPluginName from 'YOUR-PLUGIN-NAME';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [yourPluginName],
  pluginsOpts: {
    [yourPluginName]: { /* options */ }
  }
  // or
  plugins: [
    editor => yourPluginName(editor, { /* options */ }),
  ],
});
```





## Development

Clone the repository

```sh
$ git clone https://github.com/YOUR-NAME/YOUR-PLUGIN-NAME.git
$ cd YOUR-PLUGIN-NAME
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
