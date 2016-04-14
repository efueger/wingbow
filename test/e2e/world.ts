import * as assert from 'assert';

module.exports = World;

////////////////////

function World() {

    this.Given(/^I am on "([^"]*)"$/, (url) => {
        return browser.get(url);
    });

    this.Given(/^I fill in "([^"]*)" with "([^"]*)"$/, (selector, value) => {
        const input = element(by.css(selector));
        assert(input.isPresent(), `could not find "${selector}"`);
        return input.sendKeys(value);
    });

    this.Given(/^I press "([^"]*)"$/, (selector) => {
        const button = element(by.css(selector));
        assert(button.isPresent(), `could not find "${selector}"`);
        return button.click();
    });

    this.Given(/^I select "([^"]*)" from "([^"]*)"$/, (text, selector) => {
        const option = element(by.cssContainingText(`${selector} option`, text));
        assert(option.isPresent(), `could not find "${selector} option{${text}}"`);
        return option.click();
    });

    this.When(/^I wait for "([^"]*)" seconds$/, (seconds, done) => {
        setTimeout(() => {
            done();
        }, seconds * 1000);
    });

    this.Then(/^I should see "([^"]*)"$/, (expected) => {
        const selector = `body`;
        const body = element(by.css(selector));
        assert(body.isPresent(), `could not find "${selector}"`);
        return body.getText().then(actual => {
            assert(actual.includes(expected), `expected to see "${expected}" in "${selector}" but saw "${actual}"`);
        });
    });

    this.Then(/^I should not see "([^"]*)"$/, (expected) => {
        const selector = `body`;
        const body = element(by.css(selector));
        assert(body.isPresent(), `could not find "${selector}"`);
        return body.getText().then(actual => {
            assert(!actual.includes(expected), `expected to not see "${expected}" in "${selector}" but saw "${actual}"`);
        });
    });

    this.Then(/^I should see "([^"]*)" in the "([^"]*)" element(?:s|)$/, (expected, selector) => {
        const node = element(by.css(selector));
        assert(node.isPresent(), `could not find "${selector}"`);
        return node.getText().then(actual => {
            assert(actual.includes(expected), `expected to see "${expected}" in "${selector}" but saw "${actual}"`);
        });
    });

    this.Then(/^I should not see "([^"]*)" in the "([^"]*)" element(?:s|)$/, (expected, selector) => {
        const node = element(by.css(selector));
        assert(node.isPresent(), `could not find "${selector}"`);
        return node.getText().then(actual => {
            assert(!actual.includes(expected), `expected to not see "${expected}" in "${selector}" but saw "${actual}"`);
        });
    });

    this.Then(/^(?:the |)"([^"]*)" field should contain "([^"]*)"$/, (selector, expected) => {
        const input = element(by.css(selector));
        assert(input.isPresent(), `could not find "${selector}"`);
        return input.getAttribute(`value`).then(actual => {
            assert(actual.includes(expected), `expected "${selector}" to contain "${expected}" but got "${actual}"`);
        });
    });

    this.Then(/^(?:the |)"([^"]*)" field should not contain "([^"]*)"$/, (selector, expected) => {
        const input = element(by.css(selector));
        assert(input.isPresent(), `could not find "${selector}"`);
        return input.getAttribute(`value`).then(actual => {
            assert(!actual.includes(expected), `expected "${selector}" to not contain "${expected}" but got "${actual}"`);
        });
    });

}

/* vim: set cc=0 : */
