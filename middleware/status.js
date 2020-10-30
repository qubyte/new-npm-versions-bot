/**
 * Express middleware to respond with a 204 status.
 */

'use strict';

module.exports = function status(req, res) {
  res.status(204).end();
};
