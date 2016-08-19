# atomicjs

atomic is a tiny standalone module for getting a supported XHR instance, making HTTP requests and handling success/error callbacks. atomic has a very clean and readable syntax using Object chaining, as well as automatic JSON parsing when JSON is returned. atomic works in IE6+, but uses native JSON parsing which works in IE8+, so if you want browsers older than IE8 to parse the response you'll need a [JSON polyfill](http://bestiejs.github.io/json3/).

## Installation

### npm
Install via npm with the following command in your command prompt:

```sh
npm i atomicjs -S
```

You can then require atomicjs if using CJS:

```js
var atomic = require('atomicjs');
```

### Standalone
Alternatively, you can download the [minified](https://raw.githubusercontent.com/munkychop/atomicjs/master/dist/atomic.min.js), or [non-minified](https://raw.githubusercontent.com/munkychop/atomicjs/master/dist/atomic.js) source code and use a regular script tag:
  
```html
<script src="path/to/atomic.min.js"></script>
```

## API

#### atomic.get()
Use `atomic.get()` to make a `GET`. Success and error callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.get('/endpoint')
.success(function (data, xhr) {
  
})
.error(function (data, xhr) {
  
});
```

#### atomic.post()
Use `atomic.post()` to make a `POST`. Success and error callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.post('/endpoint'[, data])
.success(function (data, xhr) {
  
})
.error(function (data, xhr) {
  
});
```

#### atomic.put()
Use `atomic.put()` to make a `PUT`. Success and error callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.put('/endpoint'[, data])
.success(function (data, xhr) {
  
})
.error(function (data, xhr) {
  
});
```

#### atomic.delete()
Use `atomic.delete()` to make a `DELETE`. Success and error callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.delete('/endpoint')
.success(function (data, xhr) {
  
})
.error(function (data, xhr) {
  
});
```

#### atomic.getHeaders()
Use `atomic.getHeaders()` to get configured headers.

Default headers:
```json
headers: {
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### atomic.setHeaders(headers)
Use `atomic.setHeaders(headers)` to set new default headers.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.
