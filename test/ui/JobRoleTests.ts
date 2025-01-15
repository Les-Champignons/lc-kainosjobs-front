/* eslint-env mocha */
/* global browser */
import webdriver from 'selenium-webdriver';

const { Builder, By, until } = require('selenium-webdriver');
import { expect } from 'chai';
import { beforeEach, describe, it } from 'node:test';

describe('Job role tests', async () => {
    let driver: webdriver.WebDriver;

    beforeEach(() => {
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
    })

    it('List of job roles should contain correct data', async () => {

        const url: string = 'http://localhost:3000/job-roles';

        try {
            await driver.get(url);

            const location = await driver.findElement(By.className('job-role-table-cell__location')).getText();
            const closingDate = await driver.findElement(By.className('job-role-table-cell__closingDate')).getText();

            const dateFormat: RegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            const isDateFormat: boolean = dateFormat.test(closingDate);

            expect(isDateFormat).to.be.true;
            expect(location).to.be.string;
            
        } finally {
            await driver.quit();
        }    
    })

    it('Link should redirect to detailed job role that should contain correct information', async () => {
        const url = 'http://localhost:3000/job-roles';

        try {
            await driver.get(url);

            const links = await driver.findElements(By.className('job-role_link'));

            if (links.length > 0) {
                const firstLink = links[0];

                const roleName = await firstLink.getText();

                await firstLink.click();

                await driver.wait(until.elementLocated(By.className('govuk-heading-l')), 10000);

                const heading = await driver.findElement(By.className('govuk-heading-l')).getText();

                const jobDetailRoleName = heading.split("-")[0].trim();

                expect(roleName).to.equal(jobDetailRoleName);
            } else {
                expect.fail('No job role links found');
            }
        } finally {
            await driver.quit();
        }
    });
})