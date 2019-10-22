# {NAME}




## Summary

* Plugin name: `{RNAME}`
* Components
    * `component-id-1`
    * `component-id-2`
    * ...
* Blocks
    * `block-id-1`
    * `block-id-2`
    * ...



## Options

| Option | Description | Default |
|-|-|-
| `option1` | Description option | `default value` |



## Download

* CDN
  * `https://unpkg.com/{RNAME}`
* NPM
  * `npm i {RNAME}`
* GIT
  * `git clone https://github.com/{USER}/{RNAME}.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/{RNAME}.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['{RNAME}'],
      pluginsOpts: {
        '{RNAME}': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import yourPluginName from '{RNAME}';
import 'grapesjs/dist/css/grapes.min.css';

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
$ git clone https://github.com/{USER}/{RNAME}.git
$ cd {RNAME}
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

MIT