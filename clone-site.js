'use strict';

const { promisify } = require('util');
const exists = promisify(require('fs').exists);
const git = require('nodegit');

module.exports = async function(root, token, url) {
  if (!(await exists(siteRoot))) {
    await git.Clone(url, root, {
      fetchOpts: {
        callbacks: {
          certificateCheck: () => 1,
          credentials: () =>
            git.Cred.userpassPlaintextNew(token, 'x-oauth-basic')
        }
      }
    });
  }
};
