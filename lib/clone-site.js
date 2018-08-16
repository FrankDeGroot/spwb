'use strict';

const fs = require('fs-extra');
const git = require('nodegit');

module.exports = async ({ siteDir, siteToken, siteUrl }) => {
  if (!(await fs.exists(siteDir))) {
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
