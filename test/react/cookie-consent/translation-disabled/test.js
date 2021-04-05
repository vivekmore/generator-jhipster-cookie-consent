/* global describe, before, it */
const path = require('path');
const testUtil = require('../../../test-util');
const expectedFiles = require('./expectations.json');

describe('⚛ cookie-consent react template - translation disabled', () => {
    testUtil.commonSetup({ playgroundDir: path.join(__dirname, '/playground') });
    testUtil.commonTests({
        expectedFiles,
        resultsDir: `${__dirname}/results/`
    });
});
