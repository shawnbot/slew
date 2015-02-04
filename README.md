# slew
Loading big data files in the browser can be a pain. Slew is here to help,
providing streaming loaders for CSV and JSON data. Just add the included
`bundle.js` or `bundle.min.js` to your document's head:

```html
<script src="bundle.min.js"></script>
```

You can also link directly to the [Browserify CDN](https://wzrd.in)-hosted build at: https://wzrd.in/standalone/slew@latest

### `slew.csv(url, [options,] callback)`
Streams CSV row-by-row with [csv-parser], providing a stream to the
callback function. The optional `options` object allows you to set
parsing parameters, such as `separator` and `newline`.

```js
slew.csv("path/to/data.csv", function(stream) {
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

### `slew.json(url, [path,] callback)`
Streams JSON, emitting a `data` event whenever the optional
[JSONStream path] is matched in the output:

```js
/*
 * e.g., if your data looks like:
 * { results: [ ... ] }
 */
slew.json("path/to/data.json", "results.*", function(stream) {
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

### Coming soon: line-delimited JSON!

[csv-parser]: https://www.npmjs.com/package/csv-parser
[JSONStream path]: https://www.npmjs.com/package/JSONStream#jsonstreamparsepath
