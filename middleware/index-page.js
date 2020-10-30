/**
 * This module exports a string containing HTML for a
 * placeholder page.
 */

'use strict';

const { NPM_USER, PROJECT_DOMAIN } = process.env;

const page = `<!doctype html>
<html>
  <head>
    <title>new-npm-versions bot</title>
  </head>
  <body>
    <p>npm tells me about new package versions for ${NPM_USER}, and I tweet about 'em!</p>
    <p><a href="https://glitch.com/~${PROJECT_DOMAIN}">Take a look!</a></p>
  </body>
</html>`;

module.exports = function index(req, res) {
  res.status(200).end(page);  
};
