const { SUPPORTED_CLIENT_FRAMEWORKS } = require('generator-jhipster/generators/generator-constants');
const angularWriter = require('./cookie-consent/cookie-consent-ng-template-writer');
const reactWriter = require('./cookie-consent/cookie-consent-react-template-writer');

module.exports = {
    writeTemplate
};

function writeTemplate(generator) {
    const { clientFramework } = generator.jhipsterConfig;
    if (clientFramework === SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        angularWriter.write(generator);
    } else if (clientFramework === SUPPORTED_CLIENT_FRAMEWORKS.REACT) {
        reactWriter.write(generator);
    } else {
        generator.log(`${clientFramework} is not yet supported`);
    }
}
