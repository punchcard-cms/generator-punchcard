'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

var generator = path.join(__dirname, '../generators/input-plugin');

describe('generator-punchcard:input-plugin', function () {
  before(function (done) {
    helpers.run(generator)
      .withPrompts({
        name: 'Email',
        description: 'Plugin for inputting an email address',
        on: 'blur'
      })
      .on('end', done);
  });

  it('creates files', function () {
    var files = [
      'index.js',
      'lib/validation.js',
      'package.json',
      'tests/validation.js',
      'tests/plugin.js',
      'README.md'
    ];
    var dots = fs.readdirSync(path.join(generator, 'templates', 'dots'));

    dots = dots.map(function (dot) {
      return '.' + dot;
    });

    files = files.concat(dots);

    assert.file(files);
  });

  before(function (done) {
    helpers.run(generator)
      .withPrompts({
        name: 'Email',
        description: 'Plugin for inputting an email address',
        on: 'other',
        customOn: 'foo'
      })
      .on('end', done);
  });

  it('can take custom events', function () {
    var files = [
      'index.js',
      'lib/validation.js',
      'package.json',
      'tests/validation.js',
      'README.md'
    ];
    var dots = fs.readdirSync(path.join(generator, 'templates', 'dots'));

    dots = dots.map(function (dot) {
      return '.' + dot;
    });

    files = files.concat(dots);

    assert.file(files);
  });
});
