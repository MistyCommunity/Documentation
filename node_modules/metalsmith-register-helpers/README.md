# metalsmith-register-helpers

A Metalsmith plugin for registering Handlebars helpers.

## CLI Usage

Install via npm and then add the `metalsmith-register-helpers` key to your `metalsmith.json` plugins, like so:

```json
{
  "plugins": {
    "metalsmith-register-helpers": {
      "directory": "path/to/helpers"
    }
  }
}
```

This will register all helpers in the specified directory, and use the first part of the filename as the helper name. As a simple (and admittedly contrived) example, you could add a helper that wraps everything in `<strong>` tags, stored in the file `strong.js`:

```js
module.exports = function (content) {
  return '<strong>' + content + '</strong>'
}
```

And then access it in your templates:

```html
<pre><code>{{ strong myJSONMetadata }}</code></pre>
```

## Adding Handlebars Helpers

There are lots of helpers you could try this with in the [Handlebars Helpers](https://github.com/assemble/handlebars-helpers) library. For example, add the `capitalizeFirst` helper into `_helpers/capitalizeFirst.js`:

```js
/**
 * capitalizeFirst.js
 * http://git.io/vUJU2
 */

module.exports = function (str) {
  if (str && typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
```

Now, you can access it in your templates:

```html
<h1>{{ capitalizeFirst "the lost typo devision." }}</h1>
```

You may also include multiple helpers in a single file:

```js
module.exports = {
  capitalizeFirst: function (str) {
    if (str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  json: function (context) {
    return JSON.parse(context);
  },
  someOtherHelper: function () {
    // Etc.
  }
}
```

## Adding `devDependencies` as helpers

If you’d prefer, this is another way to include helpers installed as `dependencies` in your `package.json` file into your Metalsmith project. For example, you can install the [Moment Handlebars helper](https://www.npmjs.com/package/helper-moment):

```sh
npm install --save helper-moment
```

Then, add it as a helper in `_helpers/moment.js`:

```js
var helperMoment = require('helper-moment');

module.exports = function (str, pattern){
  return helperMoment(str, pattern)
}
```

You can now access it in your template:

```html
<time date-time="{{ date }}">{{ moment date format="MMMM Do, YYYY"}}</time>
```

## License

[The MIT License (MIT)](LICENSE.md)

Copyright © 2015 [Kenneth Ormandy](http://kennethormandy.com)<br/>
Copyright © 2015 [Lin Clark](http://lin-clark.com/)
