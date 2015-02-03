var assert = require("assert"),
    streamy = require("..");

describe("streamy.base()", function() {

  var original = streamy.base();

  it("should have an empty base URL by default", function() {
    assert.equal(original, "", "bad base URL: '" + original + "'");
  });

  it("should not change relative URIs by default", function() {
    assert.deepEqual(
      streamy.makeRequest("foo"),
      {path: "foo"},
      "no base URL should be appended by default"
    );
  });

  it("sets the base URL correctly", function() {
    streamy.base("/path/to/");
    assert.deepEqual(
      streamy.makeRequest("foo"),
      {path: "/path/to/foo"},
      "base URL should be prepended to relative URLs"
    );
  });

  it("handles absolute URIs correctly", function() {
    streamy.base("/path/to/");
    assert.deepEqual(
      streamy.makeRequest("/foo"),
      {path: "/foo"},
      "bad absolute URI"
    );
  });

  streamy.base(original);

});

describe("streamy.csv()", function() {
});

describe("streamy.json()", function() {
});
