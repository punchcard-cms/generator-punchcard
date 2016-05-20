'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var generator = path.join(__dirname, '../generators/app');

describe('generator-punchcard:app', function () {
  before(function (done) {
    helpers.run(generator)
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
