/* global before, it */
const path = require('path');
const assert = require('yeoman-assert');
const { createHelpers } = require('yeoman-test');
const fs = require('fs');
const fse = require('fs-extra');
const _ = require('lodash');

module.exports = {
    commonSetup,
    commonTests
};

const helpers = createHelpers({ generatorOptions: { skipPrettier: true } });

function commonSetup(setupConfig) {
    const {
        playgroundDir
    } = setupConfig;

    before(async () => {
        await helpers
            .create(path.join(__dirname, '../generators/app'))
            .inTmpDir((dir) => {
                fse.copySync(playgroundDir, dir);
            })
            .withOptions({
                skipInstall: true
            })
            .run();
    });
}

function commonTests(testConfig) {
    const {
        expectedFiles,
        resultsDir
    } = testConfig;

    _.forEach(expectedFiles.client.added, (file) => {
        it(`creates expected production file: ${file}`, (done) => {
            assert.file(file);
            done();
        });

        it(`production file has right content: ${file}`, (done) => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
            done();
        });
    });

    _.forEach(expectedFiles.client.addedTests, (file) => {
        it(`creates expected test file: ${file}`, (done) => {
            assert.file(file);
            done();
        });

        it(`test file has right content: ${file}`, (done) => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
            done();
        });
    });

    _.forEach(expectedFiles.client.changed, (file) => {
        it(`modifies expected production file: ${file}`, (done) => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
            done();
        });
    });
}
