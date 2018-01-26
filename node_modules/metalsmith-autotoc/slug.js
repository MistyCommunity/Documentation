// Simple equivalent to the enormous slug module <https://github.com/dodo/node-slug>
module.exports = function slug(text) {
  return text.replace(/ /, "-");
};
