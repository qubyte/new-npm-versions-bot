/**
 * This module sets up the server and makes it listen
 * for requests. It provides three endpoints:
 *  - `GET /`        A placeholder page with a little
 *                   info for browsers.
 *  - `GET /status`  Responds with a 204 status and no
 *                   body. Useful for testing with
 *                   curl.
 *  - `GET /receive` The target for GitHub webhook
 *                   requests. Triggers a tweet.
 */

'use strict';

const express = require('express');
const body = require('./middleware/body');
const indexPage = require('./middleware/index-page');
const status = require('./middleware/status');
const receive = require('./middleware/receive');

express()
  .get('/', indexPage)
  .get('/status', status)
  .post('/receive', body, receive)
  .listen(process.env.PORT, () => console.log('Listening.'));
