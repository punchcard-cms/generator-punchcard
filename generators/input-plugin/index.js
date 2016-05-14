'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the funkadelic ' + chalk.red('generator-punchcard') + ' generator!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'What\'s the name of your input plugin?',
         /* istanbul ignore next: can't test invalid input */
        validate: function (input) {
          /* istanbul ignore next: can't test invalid input */
          if (input === '') {
            return 'Please enter a input plugin name';
          }
          /* istanbul ignore next: can't test invalid input */
          return true;
        }
      },
      {
        type: 'string',
        name: 'description',
        message: 'What does your input plugin do?',
         /* istanbul ignore next: can't test invalid input */
        validate: function (input) {
          /* istanbul ignore next: can't test invalid input */
          if (input === '') {
            return 'Please enter a description for your input plugin';
          }
          /* istanbul ignore next: can't test invalid input */
          return true;
        }
      },
      {
        type: 'list',
        name: 'on',
        message: 'What event would you like to trigger validation on?',
        choices: [
          'change',
          'blur',
          'other'
        ]
      },
      {
        type: 'string',
        name: 'customOn',
        message: 'What event would you like to trigger validation on?',
        when: function (answers) {
          if (answers.on === 'other') {
            return true;
          }
          return false;
        },
         /* istanbul ignore next: can't test invalid input */
        validate: function (input) {
          /* istanbul ignore next: can't test invalid input */
          if (input === '') {
            return 'Please enter an event';
          }
          /* istanbul ignore next: can't test invalid input */
          return true;
        }
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.name = props.name;
      this.camel = _s.camelize(props.name, true);
      this.slug = _s.slugify(props.name);
      this.description = props.description;
      this.on = props.customOn ? props.customOn : props.on;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  default: function () {
    var folder = 'input-plugin-' + this.slug;

    if (path.basename(this.destinationPath()) !== folder) {
      this.log('Making folder ' + chalk.red(folder) + ' for you'
      );

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(folder));
    }

    this.config.save();
  },

  writing: function () {
    var dots = fs.readdirSync(path.join(__dirname, 'templates', 'dots'));
    var props = {
      name: this.name,
      description: this.description,
      camel: this.camel,
      on: this.on,
      slug: this.slug
    };
    var _this = this;

    // Index
    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      props
    );

    // // Validation
    this.fs.copyTpl(
      this.templatePath('_validation.js'),
      this.destinationPath('lib/validation.js'),
      props
    );

    // // Package
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      props
    );

    // // Test
    this.fs.copyTpl(
      this.templatePath('_test.js'),
      this.destinationPath('tests/validation.js'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('_test-plugin.js'),
      this.destinationPath('tests/plugin.js'),
      props
    );

    // // Test
    this.fs.copyTpl(
      this.templatePath('_readme.md'),
      this.destinationPath('README.md'),
      props
    );

    // Dot Files
    dots.map(function (dot) {
      _this.fs.copyTpl(
        _this.templatePath('dots/' + dot),
        _this.destinationPath('.' + dot),
        props
      );
      return dot;
    });
  },

  install: function () {
    this.npmInstall();
  }
});
