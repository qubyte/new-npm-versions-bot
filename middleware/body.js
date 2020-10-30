/**
 * This module exports a body parsing middleware which
 * also verifies the payload against a signature header.
 * GitHub generates the signature in exactly the same
 * way, and since a secret is used, the signature
 * provides a way to prove that the payload is from
 * GitHub and that it has not been altered.
 */

'use strict';

const crypto = require('crypto');
const body = require('body-parser');
const npmHookSecret = process.env.NPM_HOOK_SECRET;

function verify(req, res, buffer) {
  const header = req.headers['x-npm-signature'];

  if (!header) {
    throw new Error('No signature header.');
  }

  if (!header.startsWith('sha256=')) {
    throw new Error('Malformed signature header.');
  }

  let signature;

  try {
    signature = crypto.createHmac('sha256', npmHookSecret).update(buffer).digest('hex');
  } catch (e) {
    throw new Error('Unable to regenerate signature.');
  }

  if ('sha256=' + signature !== header) {
    throw new Error('Unexpected signature.');
  }
}

module.exports = body.json({ verify });
