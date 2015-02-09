# slew
Loading big data files in the browser can be a pain. Slew is here to help,
providing streaming loaders for CSV and JSON data. Just add the included
`bundle.js` or `bundle.min.js` to your document's head:

```html
<script src="bundle.min.js"></script>
```

You can also link directly to the [Browserify CDN](https://wzrd.in)-hosted build at: https://wzrd.in/standalone/slew@latest

### `slew.csv([options])`
Returns an object that streams CSV row-by-row using [csv-parser]. The returned object has an `open()` method which takes a URL (string or object, as parsed by [url](http://nodejs.org/api/url.html)) and an optional callback:

```js
slew.csv()
  .open('path/to/data.csv', function(stream) {
    var rows = [];
    stream
      .on('data', function(row) {
        rows.push(row);
      })
      .on('end', function() {
        console.log('all done!');
      });
  });
```

Note that the `stream` object in the callback is the same object returned by `slew.csv()`. You can leave off the callback function as the second argument to `open()` and listen for events on the object directly:

```js
slew.csv()
  .open('path/to/data.csv')
  .on('start', function(res) { })
  .on('data', function(row) { })
  .on('end', function() { });
```

The  `options` object allows you to set parsing parameters, such as `separator` and `newline`. For instance, to read tab-separated values:

```js
slew.csv({separator: '\t'})
  .open('path/to/data.tsv')
  // etc.
```

### `slew.json([path])`
Like `csv()`, the `json()` function streams data from a potentially large JSON file, emitting a `data` event whenever the optional [JSONStream path] is matched in the output. The default path is `.*`, which will match each item in a top-level JSON array.

```js
/*
 * e.g., if your data looks like:
 * { results: [ ... ] }
 */
slew.json('results.*')
  .open('path/to/data.json', function(stream) {
    var rows = [];
    stream
      .on("data", function(row) {
        rows.push(row);
      })
      .on("end", function() {
        console.log("all done!");
      });
  });
```

Or:

```js
slew.json('results.*')
  .open('path/to/data.json')
  .on('start', function(res) { })
  .on('data', function(d) { })
  .on('end', function() { });
```

### Coming soon: line-delimited JSON!

[csv-parser]: https://www.npmjs.com/package/csv-parser
[JSONStream path]: https://www.npmjs.com/package/JSONStream#jsonstreamparsepath
