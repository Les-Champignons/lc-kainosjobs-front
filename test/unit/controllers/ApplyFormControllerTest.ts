import { expect } from 'chai';
import sinon from 'sinon';
import * as ApplyFormController from "../../../src/controllers/ApplyFormController"
import * as app from "../../../src/app"
import { after, afterEach, describe } from 'node:test';

// Testing that the 'console.log(req.file)' (which logs the callback) contains the 'originalname' of the file 'profile_pic.jpg' 
// 'upload' is the function that we are using from 'app'
describe('ApplyFormController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('postJobForm', function() {
        it('should contain correct original name of uploaded file', async () => {
            const originalName = 'profile_pic.jpg';
            
            sinon.stub(app, 'upload').resolves(originalName)

            const req

            expect(file).to.equal('profile_pic.jpg')
        });
    });
});