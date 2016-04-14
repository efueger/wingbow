import * as assert from 'assert';

module.exports = Calculator;

////////////////////

function Calculator() {

    this.When(/^I press equals$/, () => {
        const selector = `#gobutton`;
        const button = element(by.css(selector));
        assert(button.isPresent(), `could not find "${selector}"`);
        return button.click();
    });

}
