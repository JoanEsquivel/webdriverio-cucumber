const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

const pages = {
    login: LoginPage
}

//REGEX Explanation
//() - Groups multiple tokens together and creates a capture group for extracting a substring or using a backreference.
//\w - Word.  Matches any word character (alphanumeric & underscore).
//+ - Quantifier: Match 1 or more of the preceding token.
//$ Matches the end of the string, or the end of a line if the multiline flag
Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});
//. - Dot. -  Matches any character except line breaks.
When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

