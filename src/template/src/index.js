<% if(components){ %>import loadComponents from './components';<% } %>
<% if(blocks){ %>import loadBlocks from './blocks';<% } %>

export default (editor, opts = {}) => {
  const options = { ...{
    // default options
  },  ...opts };

  <% if(components){ %>// Add components
  loadComponents(editor, options);<% } %>
  <% if(blocks){ %>// Add blocks
  loadBlocks(editor, options);<% } %>

  // TODO Remove
  editor.on('load', () =>
    editor.addComponents(
        `<div style="margin:100px; padding:25px;">
            Content loaded from the plugin
        </div>`,
        { at: 0 }
    ))
};
