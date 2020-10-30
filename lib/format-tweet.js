'use strict';

const project = process.env.PROJECT_DOMAIN;

module.exports = function formatTweet({ name, version }) {
  return `New npm package published! ${name}@${version}. Tweet by https://${project}.glitch.me/`;
};
