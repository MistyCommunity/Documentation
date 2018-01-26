# Metalsmith Paths [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

A Metalsmith plugin that adds file path values (`base`, `dir`, `ext`, `name`, `href`) to metadata `path` property.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```sh
npm install --save metalsmith-paths
```

## API

```js
var Metalsmith = require('metalsmith')
var paths = require('metalsmith-paths')

var metalsmith = new Metalsmith(__dirname)
  .use(paths({
    property: "paths"
  }))
```

## CLI

You can also use the plugin with the Metalsmith CLI by adding a key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-paths": {
      "property": "paths"
    }
  }
}
```

## Options

| name       | description                        | default |
| ---------- | ---------------------------------- | ------- |
| `property` | property to store the path data to | `path`  |


## Support

Donations are welcome to help support the continuous development of this project.

[![Gratipay][gratipay-image]][gratipay-url]
[![PayPal][paypal-image]][paypal-url]
[![Flattr][flattr-image]][flattr-url]
[![Bitcoin][bitcoin-image]][bitcoin-url]

## License

[MIT](LICENSE) &copy; [Ahmad Nassri](https://www.ahmadnassri.com)

[license-url]: https://github.com/ahmadnassri/metalsmith-paths/blob/master/LICENSE

[travis-url]: https://travis-ci.org/ahmadnassri/metalsmith-paths
[travis-image]: https://img.shields.io/travis/ahmadnassri/metalsmith-paths.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/metalsmith-paths
[npm-license]: https://img.shields.io/npm/l/metalsmith-paths.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/metalsmith-paths.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/metalsmith-paths.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/metalsmith-paths
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/metalsmith-paths.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/metalsmith-paths.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/metalsmith-paths
[david-image]: https://img.shields.io/david/ahmadnassri/metalsmith-paths.svg?style=flat-square

[gratipay-url]: https://www.gratipay.com/ahmadnassri/
[gratipay-image]: https://img.shields.io/gratipay/ahmadnassri.svg?style=flat-square

[paypal-url]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2B2BTK9VLRS&on0=project&os0=metalsmith-paths
[paypal-image]: http://img.shields.io/badge/paypal-donate-green.svg?style=flat-square

[flattr-url]: https://flattr.com/submit/auto?user_id=ahmadnassri&url=https://github.com/ahmadnassri/metalsmith-paths&title=metalsmith-paths&language=&tags=github&category=software
[flattr-image]: http://img.shields.io/badge/flattr-donate-green.svg?style=flat-square

[bitcoin-image]: http://img.shields.io/badge/bitcoin-1Nb46sZRVG3or7pNaDjthcGJpWhvoPpCxy-green.svg?style=flat-square
[bitcoin-url]: https://www.coinbase.com/checkouts/ae383ae6bb931a2fa5ad11cec115191e?name=metalsmith-paths
