/* eslint-env mocha */
/* global browser */
import webdriver from 'selenium-webdriver';

const { Builder, By, until } = require('selenium-webdriver');
import { expect } from 'chai';
import { describe, it } from 'node:test';

describe('Job role tests', async () => {
    it('List of job roles should contain text', async () => {

        const driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();

        const url: string = 'http://localhost:3000/job-roles';
        try {
            await driver.get(url);

            const cells = await driver.findElements(By.className('govuk-table__cell'));

            for (let cell of cells) {
                let text = await cell.getText();
                expect(text).to.not.be.empty;
            }
        } finally {
            await driver.quit();
        }    
    })

    it('Link should redirect to detailed job role that should contain correct information', async () => {
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
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