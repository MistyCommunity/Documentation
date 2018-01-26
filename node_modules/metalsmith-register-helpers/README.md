# metalsmith-register-helpers

A Metalsmith plugin for registering Handlebars helpers.

## CLI Usage

Install via npm and then add the `metalsmith-register-partials` key to your `metalsmith.json` plugins, like so:

```
{
  "plugins": {
    "metalsmith-register-helpers": {
      "directory": "path/to/helpers"
    }
  }
}
```

This will register all helpers in the specified directory, and use the first part of the filename as the helper name. For example, you could add a JSON helper in the file `json.js`:

```js
module.exports = (function(content) {
  return JSON.stringify(content);
});
```

And then access it in your templates:

```html
<pre><code>{{ json myJSONMetadata }}</code></pre>
```

## Adding Handlebars Helpers

There are lots of helpers you could try this with in the [Handlebars Helpers](https://github.com/assemble/handlebars-helpers) library. For example, add the `capitalizeFirst` helper into `helpers/ellipsis.js`:

```js
/**
 * capitalizeFirst.js
 * http://git.io/vUJU2
 */

module.exports = function (str) {
    if(str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
```

Now, you can access it in your templates:

```html
<h1>{{ capitalizeFirst "the lost typo devision." }}</h1>
```

## License

[The MIT License (MIT)](LICENSE.md)

Copyright © 2015 [Kenneth Ormandy](http://kennethormandy.com)<br/>
Copyright © 2015 [Lin Clark](http://lin-clark.com/)
