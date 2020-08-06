const constants = require('./constants');
const cookieConsentNg2TemplateWriter = require('./cookie-consent/cookie-consent-ng-template-writer');

module.exports = {
    writeTemplate
};

function writeTemplate(generator) {
    switch (generator.templateType) {
    case constants.TEMPLATE_TYPE.COOKIE_CONSENT:
        writeCookieConsentTemplate(generator);
        break;
    default:
        break;
    }
}

function writeCookieConsentTemplate(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        cookieConsentNg2TemplateWriter.write(generator);
    }
}
