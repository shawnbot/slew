var assert = require("assert"),
    slew = require("..");

describe("slew.base()", function() {

  var original = slew.base();

  it("should have an empty base URL by default", function() {
    assert.equal(original, "", "bad base URL: '" + original + "'");
  });

  it("should not change relative URIs by default", function() {
    assert.deepEqual(
      slew.makeRequest("foo"),
      {path: "foo"},
      "no base URL should be appended by default"
    );
  });

  it("sets the base URL correctly", function() {
    slew.base("/path/to/");
    assert.deepEqual(
      slew.makeRequest("foo"),
      {path: "/path/to/foo"},
      "base URL should be prepended to relative URLs"
    );
  });

  it("handles absolute URIs correctly", function() {
    slew.base("/path/to/");
    assert.deepEqual(
      slew.makeRequest("/foo"),
      {path: "/foo"},
      "bad absolute URI"
    );
  });

  slew.base(original);

});

describe("slew.csv()", function() {
  // TODO
});

describe("slew.json()", function() {
  // TODO
});
