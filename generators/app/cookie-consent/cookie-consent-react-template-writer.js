// const _ = require('lodash');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = {
    write
};

function write(generator) {
    const jhipsterConfig = generator.jhipsterConfig;
    generator.enableTranslation = jhipsterConfig.enableTranslation;
    const templateDir = '../templates/react/cookie-consent';
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // add required dependencies to package.json
    generator.addNpmDependency('react-cookie-consent', '6.2.3');

    // update app.tsx
    const appTsx = `${webappDir}app/app.tsx`;
    const importAppCookieConsent = 'import AppCookieConsent from \'app/shared/cookie-consent/cookie-consent\';\nimport AppRoutes';
    generator.replaceContent(appTsx, 'import AppRoutes', importAppCookieConsent);
    const appCookieConsent = '<Footer />\n          <AppCookieConsent />';
    generator.replaceContent(appTsx, '<Footer />', appCookieConsent);

    // add cookie-consent.tsx
    generator.template(
        `${templateDir}/src/main/webapp/app/shared/cookie-consent/cookie-consent.tsx.ejs`,
        `${webappDir}app/shared/cookie-consent/cookie-consent.tsx`
    );

    // add i18n COOKIE-CONSENT JSON
    if (generator.enableTranslation) {
        const allInstalledLanguages = generator.getAllInstalledLanguages();
        allInstalledLanguages
            .forEach((language) => {
                generator.currentLanguagePrefix = language === jhipsterConfig.nativeLanguage ? '' : `[${language}] `;
                generator.template(
                    `${templateDir}/src/main/webapp/i18n/lang/cookie-consent.json.ejs`,
                    `${webappDir}i18n/${language}/cookie-consent.json`
                );
            }, generator);
    }
}
