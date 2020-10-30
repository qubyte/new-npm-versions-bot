# new-npm-versions bot

This project is a server which listens for npm hook requests. When a hook
request arrives for a new package version, it tweets about the new version on
my behalf.

To use it, you'll need to remix this project. When you've chosen a name, this
will be the subdomain of your webhook server URL. Use this to create an
[npm hook][1] (the simplest way to create and manage hooks is using the
[wombat][5] utility). This server includes both a `GET /` endpoint which
responds with HTML (good for trying out in the browser) and `GET /status` which 
responds with no body and a `204` status code (good for testing with [curl][4]).
When you create the npm hook, use a secret and put it into the `.env`
file.

You will also need to set up a [twitter app][2] so that this bot can post to
your twitter timeline. Put the variables for this new app in the `.env` file.

## Known issues

An [npm repository bug][3] means that the first `package:publish` event for
each package will instead be sent as a `package:change` event, which the bot
won't understand (so it won't get tweeted). Subsequent publishes should result
in the correct behaviour.

[1]: https://github.com/npm/registry/tree/master/docs/hooks
[2]: https://apps.twitter.com/
[3]: https://github.com/npm/registry/issues/25
[4]: https://curl.haxx.se/
[5]: https://www.npmjs.com/package/wombat