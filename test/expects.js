'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  exists: async (...args) => {
    const file = path.join(...args);
    if (!(await fs.exists(file))) {
      throw new Error(`Expected ${file}.`);
    }
  }
};
