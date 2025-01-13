/* eslint-env mocha */
/* global browser */
import webdriver from 'selenium-webdriver';

const { Builder, By, until } = require('selenium-webdriver');
import { expect } from 'chai';
import { describe, it } from 'node:test';

describe('Employee test', async () => {
    it('List of job roles should exist', async () => {

        const driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();

        const url: string = 'http://localhost:3000/job-roles';
        try {
            await driver.get(url);

            const cells = await driver.findElements(By.className('govuk-table__cell'));

            for (let cell of cells) {
                let text = await cell.getText();
                console.log(text);
                expect(text).to.not.be.empty;
            }
            console.log('All cells contain text.');
        } finally {
            await driver.quit();
        }    
    })
    // /*
    // UI Test Exercise 1

    // Write an UI test for the add employee flow

    // Try to create an employee with a salary of £10,000

    // Expect 'Salary must be at least £20,000' error to be displayed
    // */

    // it('Should return error when creating £10,000', async () => {
    //     const driver = new webdriver.Builder().
    //         withCapabilities(webdriver.Capabilities.chrome()).
    //         build();

    //     const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/'
    //     await driver.get(url);

    //     await driver.findElement(webdriver.By.id('add-employee-button')).click();
    //     await driver.findElement(webdriver.By.id('fname')).sendKeys('Poorly Paid Employee');
    //     await driver.findElement(webdriver.By.id('lname')).sendKeys('Tests');
    //     await driver.findElement(webdriver.By.id('email')).sendKeys('testemail@email.com');
    //     await driver.findElement(webdriver.By.id('address')).sendKeys('1 Home Street');
    //     await driver.findElement(webdriver.By.id('address2')).sendKeys('Home Lane');
    //     await driver.findElement(webdriver.By.id('city')).sendKeys('Belfast');
    //     await driver.findElement(webdriver.By.id('county')).sendKeys('Antrim');
    //     await driver.findElement(webdriver.By.id('postalCode')).sendKeys('BT9');
    //     await driver.findElement(webdriver.By.id('country')).sendKeys('Norn Iron');
    //     await driver.findElement(webdriver.By.id('phoneNo')).sendKeys('01234567890');
    //     await driver.findElement(webdriver.By.id('bankNo')).sendKeys('12345678');
    //     await driver.findElement(webdriver.By.id('nin')).sendKeys('AA1A11AA');
    //     await driver.findElement(webdriver.By.id('salary')).sendKeys('10000');
    //     await driver.findElement(webdriver.By.id('submit')).click();
        
    //     const errorText = await driver.findElement(webdriver.By.id('create-employee-error')).getText();

    //     expect(errorText).to.equal('Salary must be at least £20,000')

    //     await driver.quit();
    // })


    // /*
    // UI Test Exercise 2

    // Write an UI test for view employee workflow

    // Navigate from the homepage to the employee list

    // Click on an employee name

    // Expect the name on the view employee page to match the name from the link you've clicked
    // */

    // it('Should display same name as link shows', async () => {
    //     const driver = new webdriver.Builder().
    //         withCapabilities(webdriver.Capabilities.chrome()).
    //         build();

    //     const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/'
    //     await driver.get(url);

    //     await driver.findElement(webdriver.By.id('view-employees-button')).click();
    //     await driver.findElement(webdriver.By.linkText('John Doe')).click();
    
    //     const name = await driver.findElement(webdriver.By.id('name')).getText();

    //     expect(name).to.equal('John Doe');


    //     await driver.quit();
    // })

    // /*
    // UI Test Exercise 3

    // Write an UI test for view employee workflow

    // Navigate directly to the view employee page with an invalid ID

    // Expect 'Employee does not exist' error to be displayed
    // */

  })