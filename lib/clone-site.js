'use strict';

const { promisify } = require('util');
const exists = promisify(require('fs').exists);
const git = require('nodegit');

module.exports = async function({ siteDir, siteToken, siteUrl }) {
  if (!(await exists(siteDir))) {
    await git.Clone(siteUrl, siteDir, {
      fetchOpts: {
        callbacks: {
          certificateCheck: () => 1,
          credentials: () =>
            git.Cred.userpassPlaintextNew(siteToken, 'x-oauth-basic')
        }
      }
    });
  }
};
