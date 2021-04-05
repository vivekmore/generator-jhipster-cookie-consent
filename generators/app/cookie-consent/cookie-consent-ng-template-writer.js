const _ = require('lodash');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = {
    write
};

function write(generator) {
    const jhipsterConfig = generator.jhipsterConfig;

    generator.baseName = jhipsterConfig.baseName;
    generator.packageName = jhipsterConfig.packageName;
    generator.frontendAppName = generator.getFrontendAppName();
    generator.enableTranslation = jhipsterConfig.enableTranslation;
    generator.nativeLanguage = jhipsterConfig.nativeLanguage;
    generator.useSass = jhipsterConfig.useSass;
    generator.jhiPrefixCapitalized = generator.upperFirstCamelCase(jhipsterConfig.jhiPrefix);
    generator.jhiPrefixDashed = _.kebabCase(jhipsterConfig.jhiPrefix);

    const templateDir = '../templates/angular/cookie-consent';
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // add required dependencies to package.json
    generator.addNpmDependency('cookieconsent', '3.1.1');
    generator.addNpmDependency('ngx-cookieconsent', '2.2.3');

    // update app.module.ts
    const appModule = `${webappDir}app/app.module.ts`;
    const importCookieConsentMin = 'import \'cookieconsent/build/cookieconsent.min\';';
    generator.rewriteFile(appModule, 'jhipster-needle-angular-add-module-import', importCookieConsentMin);

    // update shared-libs.module.ts
    const sharedLibsModule = `${webappDir}app/shared/shared-libs.module.ts`;
    const cookieConsentModule = `${generator.jhiPrefixCapitalized}CookieConsentModule`;
    const importCookieConsentModule = `import { ${cookieConsentModule} } from 'app/shared/cookie-consent/cookie-consent.module';`
        + '\n\n@NgModule';
    generator.replaceContent(sharedLibsModule, '@NgModule', importCookieConsentModule);
    const exportCookieConsentModule = `exports: [\n    ${cookieConsentModule},`;
    generator.replaceContent(sharedLibsModule, 'exports: [', exportCookieConsentModule);

    // update vendor.scss
    generator.addVendorSCSSStyle('@import \'~cookieconsent/build/cookieconsent.min.css\';', 'For more customization see: https://www.npmjs.com/package/ngx-cookieconsent');

    // update main.component.html
    const mainComponentHtml = `${webappDir}app/layouts/main/main.component.html`;
    const prefix = generator.jhiPrefixDashed;
    const originalContent = generator.fs.read(mainComponentHtml);
    generator.fs.write(mainComponentHtml, `${originalContent}\n<${prefix}-cookie-consent></${prefix}-cookie-consent>\n`);

    // add cookie-consent module
    [
        'cookie-consent.component.ts',
        'cookie-consent.constants.ts',
        'cookie-consent.module.ts',
        'cookie-consent.service.ts'
    ].forEach((file) => {
        generator.template(
            `${templateDir}/src/main/webapp/app/shared/cookie-consent/${file}.ejs`,
            `${webappDir}app/shared/cookie-consent/${file}`
        );
    });

    // add i18n COOKIE-CONSENT JSON
    if (generator.enableTranslation) {
        generator.getAllInstalledLanguages()
            .forEach((language) => {
                generator.currentLanguagePrefix = language === generator.nativeLanguage ? '' : `[${language}] `;
                generator.template(
                    `${templateDir}/src/main/webapp/i18n/lang/cookie-consent.json.ejs`,
                    `${webappDir}i18n/${language}/cookie-consent.json`
                );
            }, generator);
    }
}
