const constants = require('./constants');
const cookieConsentNg2TemplatePrompter = require('./cookie-consent/cookie-consent-ng-template-prompter');

module.exports = {
    promptToChooseATemplate,
    promptTemplateSpecificQuestions
};

function promptToChooseATemplate() {
    const done = this.async();

    this.prompt({
        type: 'list',
        name: 'templateType',
        message: 'What would you like to generate? (More components will be added soon! Stay tuned...)',
        choices: [
            {
                name: 'A Cookie Consent Popup',
                value: constants.TEMPLATE_TYPE.COOKIE_CONSENT
            }
        ]
    }).then((prompt) => {
        this.templateType = prompt.templateType;
        // To access props later use this.someOption;
        done();
    });
}

function promptTemplateSpecificQuestions() {
    switch (this.templateType) {
    case constants.TEMPLATE_TYPE.COOKIE_CONSENT:
        askCookieConsentTemplateQuestions(this);
        break;
    default:
        break;
    }
}

function askCookieConsentTemplateQuestions(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        cookieConsentNg2TemplatePrompter.askQuestions(generator);
    }
}
