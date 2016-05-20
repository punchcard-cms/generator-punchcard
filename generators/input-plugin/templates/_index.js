'use strict';

/**
 * <%= name %> Input Plugin
 *
 *
 * <%= description %>
 */
const validation = require('./lib/validation.js');

/**
 * Single <%= name %> Input Plugin
 * @module <%= camel %>InputPlugin
 */
module.exports = {
  name: '<%= name %>',
  description: '<%= description %>',
  validation: {
    <%= camel %>Validation: validation,
  },
  inputs: {
    <%= camel %>: {
      validation: {
        function: '<%= camel %>Validation',
        on: '<%= on %>',
      },
      label: '<%= name %>',
      placeholder: '<%= name %>',
      settings: {
        empty: false,
      },
    },
  },
  html: '<label for="{{<%= camel %>.id}}">{{<%= camel %>.label}}</label><input type="text" id="{{<%= camel %>.id}}" name="{{<%= camel %>.name}}" value="{{<%= camel %>.value}}" placeholder="{{<%= camel %>.placeholder}}" />',
};
