const BaseGenerator = require('generator-jhipster/generators/generator-base');
const chalk = require('chalk');
const semver = require('semver');

const packageJson = require('../../package.json');
const mainWriter = require('./main-writer');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            displayLogo() {
                // Have Yeoman greet the user.
                this.log('\n');
                this.log(`${chalk.bold.cyan(' e88~-_                    888   _   ,e,                  e88~-_                                                d8     ')}`);
                this.log(`${chalk.bold.cyan('d888   \\  e88~-_   e88~-_  888 e~ ~   "   e88~~8e        d888   \\  e88~-_  888-~88e  d88~\\  e88~~8e  888-~88e _d88__')}`);
                this.log(`${chalk.bold.cyan('8888     d888   i d888   i 888d8b    888 d888  88b       8888     d888   i 888  888 C888   d888  88b 888  888  888     ')}`);
                this.log(`${chalk.bold.cyan('8888     8888   | 8888   | 888Y88b   888 8888__888       8888     8888   | 888  888  Y88b  8888__888 888  888  888     ')}`);
                this.log(`${chalk.bold.cyan('Y888   / Y888   \' Y888   \' 888 Y88b  888 Y888    ,       Y888   / Y888   \' 888  888   888D Y888    , 888  888  888  ')}`);
                this.log(`${chalk.bold.cyan(' "88_-~   "88_-~   "88_-~  888  Y88b 888  "88___/         "88_-~   "88_-~  888  888 \\_88P   "88___/  888  888  "88_/  ')}`);

                this.log(`\n\nWelcome to the ${chalk.bold.cyan('JHipster Cookie Consent')} generator! ${chalk.yellow(`v${packageJson.version}\n`)}`);
            },
            checkJhipster() {
                const jhipsterVersion = this.jhipsterConfig.jhipsterVersion;
                const minimumJhipsterVersion = packageJson.dependencies['generator-jhipster'];
                if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

    get writing() {
        return {
            writeTemplateSpecificFiles() {
                mainWriter.writeTemplate(this);
            }
        };
    }

    end() {
        this.log('That was easy!! Enjoy your fully functional cookie consent popup.');
    }
};
