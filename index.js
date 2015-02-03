var csv = require("csv-parser"),
    url = require("url"),
    JSONStream = require("JSONStream"),
    http = require("http");

var baseUrl = "";
module.exports = {
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
  },

  /*
   * Open a streaming CSV (comma-separated values) request.
   * see <http://npmjs.com/package/csv-parser> for options.
   */
  csv: function(url, options, callback) {
    if (arguments.length === 2) {
      callback = options;
      options = {};
    }
    var req = makeRequest(url),
        parse = csv(options);
    return http.get(req, function(res) {
      callback(res.pipe(parse));
    });
  },

  /*
   * Open a streaming JSON values) request.
   * See <https://www.npmjs.com/package/JSONStream> for options.
   */
  json: function(url, path, callback) {
    if (arguments.length === 2) {
      callback = path;
      options = "*";
    }
    var req = makeRequest(url),
        parse = JSONStream.parse(path);
    return http.get(req, function(res) {
      callback(res.pipe(parse));
    });
  },

  makeRequest: makeRequest
};

/*
 * Build a request object from a relative path or parsed URL:
 *
 * makeRequest("foo") === {path: baseUrl + "foo"}
 * makeRequest("/foo") === {path: "/foo"}
 * makeRequest("http://foo.com") === {host: "foo.com", protocol: "http", ...}
 */
function makeRequest(req) {
  if (typeof req === "string") {
    if (req.charAt(0) === "/") {
      return {path: req};
    } else {
      var parsed = url.parse(req);
      return (parsed.protocol)
        ? parsed
        : {path: baseUrl + req};
    }
  }
  return req;
}
