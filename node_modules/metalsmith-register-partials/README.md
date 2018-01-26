# metalsmith-register-partials

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A Metalsmith plugin for registering Handlebars partials.

## CLI Usage

Install via npm and then add the `metalsmith-register-partials` key to your `metalsmith.json` plugins, like so:

```
{
  "plugins": {
    "metalsmith-register-partials": {
      "directory": "path/to/partials"
    }
  }
}
```

This will register all partials in the specified directory and use the first part of the filename as the partial name.

## License

MIT, see [LICENSE.md](http://github.com/linclark/metalsmith-register-partials/blob/master/LICENSE.md) for details.
