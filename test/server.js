var express = require("express"),
    proxy = require("http-proxy")
      .createProxyServer({
        hostRewrite: true // handle redirects
      }),
    app = express(),
    proxies = {
      csv: "https://cdn.rawgit.com/WhiteHouse/2016-budget-data/master/data/",
      json: "http://hub.healthdata.gov/"
    };

// serve static assets from test and .
app.use(express.static(__dirname));
app.use(express.static("."));

Object.keys(proxies).forEach(function(type) {
  var target = proxies[type];
  app.get(new RegExp(".*\." + type + "$"), function(req, res) {
    console.log("proxying:", type, "->", target);
    proxy.web(req, res, {target: target});
  });
});

var listener = app.listen(4001, function(error) {
  if (error) return console.error("error:", error);
  console.log("test server started at:\n\nhttp://localhost:%d", listener.address().port);
});
