const cookieConsentNg2TemplateWriter = require('./cookie-consent/cookie-consent-ng-template-writer');

module.exports = {
    writeTemplate
};

function writeTemplate(generator) {
    if (generator.jhipsterConfig.clientFramework === 'angularX') {
        cookieConsentNg2TemplateWriter.write(generator);
    }
}
