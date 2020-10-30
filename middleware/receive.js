/**
 * Express middleware to process a npm webhook request
 * into a tweet. It filters out everything except for
 * `package:publish` events, which contain information
 * about newly published versions.
 */

'use strict';

const twitterClient = require('../lib/twitter-client');
const formatTweet = require('../lib/format-tweet');
const fs = require('fs');
const path = require('path');

module.exports = async function receive(req, res) {
  console.log('received:', req.body);

  const { name, event, change: { version, 'dist-tag': distTag } } = req.body;

  if (event !== 'package:publish' || distTag !== 'latest') {
    return res.status(204).end();
  }
  
  fs.writeFile(path.join(__dirname, '..', '.data', Date.now()), JSON.stringify(req.body, null, 2), err => {
    if (err) {
      console.error('Error writing body data.');
    }
  });

  const status = formatTweet({ name, version });
  
  try {
    await twitterClient.post('statuses/update', { status });
    res.status(201).end();
  } catch (e) {
    console.error(e);
    res.status(502).end();
  }
};
