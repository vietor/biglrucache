# biglrucache

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

LRU Cache for Javascript

## Installation

```sh
$ npm install biglrucache
```

## Usage

``` javascript
var biglrucache = require('biglrucache');

var cache = biglrucache(10, function(key, value) {});
cache.set('a', 'a');
cache.has('a');
cache.get('a');
cache.del('a');
```

### Parameters

|*Name*|*Type*|*Description*|*Requirement*|
|---|---|---|---|
|capacity|int|the capacity of cache keys, min: 3, default: 100000|N|
|notify|function|processor a key be removed when cache shrinked|N|

### API

### biglrucache#get(key)
Get a cache by key.

### biglrucache#set(key, value)
Set new or update cache by key, call **notify** when shrink keys.

### biglrucache#del(key)
Delete a cache by key, not call the **notify**.

### biglrucache#has(key)
Test a cache by key

### biglrucache#hit(key)
Refresh a cache by key

### biglrucache#clear(key)
Clear all cache, not call the **notify**.

### biglrucache#keys()
Get all cached keys (string array)

### biglrucache#info()
Get information

#### Result

|*Name*|*Type*|*Description*|*Requirement*|
|---|---|---|---|
|capacity|int|the capacity of cache keys|Y|
|length|int|The count of cache keys|Y|

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/biglrucache.svg
[npm-url]: https://npmjs.org/package/biglrucache
[downloads-image]: https://img.shields.io/npm/dm/biglrucache.svg
[downloads-url]: https://npmjs.org/package/biglrucache
