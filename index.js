var csv = require("csv-parser"),
    _url = require("url"),
    events = require("events"),
    extend = require("util-extend"),
    JSONStream = require("JSONStream"),
    http = require("http"),
    https = require("https"),
    pkg = require("./package.json"),
    baseUrl = "";

module.exports = {
  version: pkg.version,

  format: createFormat,
  csv: createFormat(csv),
  json: createFormat(JSONStream.parse),

  /*
   * Get or set the base URL for requests.
   * See usage in index-browserify.js
   */
  base: function(url) {
    if (arguments.length) {
      baseUrl = url;
      return this;
    }
    return baseUrl;
  }
};

function createFormat(createParser) {
  return function customFormat(options) {
    var req;
    if (arguments.length > 1) {
      req = options;
      options = arguments[1];
    }

    var stream = new events.EventEmitter(),
        base = baseUrl,
        parser = createParser(options);

    stream.baseUrl = function(url) {
      if (!arguments.length) return base;
      base = url;
      return stream;
    };

    stream.open = function(url, done) {
      var req = makeRequest(url);
          hypertext = (req.protocol === "https")
            ? https
            : http,
          parse = createParser(options);

      hypertext.get(req, function(res) {
        stream.emit('start', req, res);
        res.pipe(parse)
          .on('data', function ondata(data) {
            stream.emit('data', data);
          })
          .on('error', function onerror(error) {
            stream.emit('error', error);
            // XXX close the stream?
          })
          .on('end', function onend() {
            stream.emit('end');
          });
        if (done) done(null, res);
      });

      return stream;
    };

    return req
      ? stream.open(req)
      : stream;
  };
}

function makeRequest(req) {
  if (typeof req === "string") {
    if (req.charAt(0) === "/") {
      return {path: req};
    } else {
      var parsed = _url.parse(req);
      return (parsed.protocol)
        ? parsed
        : {path: baseUrl + req};
    }
  }
  return req;
}
