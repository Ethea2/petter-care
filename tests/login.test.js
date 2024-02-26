// required libraries
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// Models
const modelPath = '../backend/src/models/';
const userModel = require('../backend/src/models/user.model.ts').default;

// APIs
const apiPath = '../backend/src/api/';
const authController = require(apiPath + 'controllers/auth.controller');
const userController = require(apiPath + 'controllers/user.controller');
const authMiddleWare = require(apiPath + 'middleware/auth.middleware');

// Test Case 1: Input Validation for Login
describe('Input Validation for Login', () => {
    let error = new Error({ error: 'Some error message' });
    // Failing Cases
    describe('Empty Login Fields', () =>{
        let res, req, loginStub;

        // Setup before each test case
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            req = {
                body: {
                    username: '',
                    password: ''
                }
            };
        });

        afterEach(() => {
            // executed after the test case
            loginStub.restore();
        });
    
        it('Should return status 400 on empty username and password', () => {
            // Arrange
            const error = new Error('Invalid credentials');
            loginStub = sinon.stub(userModel, 'login').yields(error);

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(loginStub, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
            // sinon.assert.calledOnce(res.status(400).end);
        });

        it('Should return status 400 on empty username and non-empty password', () => {
            // Arrange
            req.body.password = 'letmeinpls';
            loginStub = sinon.stub(userModel, 'login').yields(error);

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(loginStub, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);

            // sinon.assert.calledOnce(res.status(400).end);
        });

        it('Should return status 400 on non-empty username and empty password', () => {
            // Arrange
            req.body.username = 'youshallnotpass';
            loginStub = sinon.stub(userModel, 'login').yields(error);
            
            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(loginStub, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
            // sinon.assert.calledOnce(res.status(400).end);
        });
    });

    describe('Invalid Credentials', () => {
        let res, req, loginStub;

        // Setup before each test case
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            req = {
                body: {
                    username: '',
                    password: ''
                }
            };
        });
        afterEach(() => {
            loginStub.restore();
        })

        it('Should return status 400 on valid username and invalid password', () => {
            // Arrange
            req.body.username = 'validusername';
            loginStub = sinon.stub(userModel, 'login').yields(error);

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(loginStub, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
            // sinon.assert.calledOnce(res.status(400).end);
        });

        it('Should return status 400 on invalid username and valid password', () => {
            // Arrange
            req.body.username = 'validusername';
            loginStub = sinon.stub(userModel, 'login').yields(error);

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(loginStub, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
            // sinon.assert.calledOnce(res.status(400).end);
        });
    });

    // Passing Case
    describe('Valid Credentials', () => {
        it('Should return jwt token and status 200', () =>{
            // TODO: Fill up code
        });
    });
});

// Test Case 2: Hashed Password
describe('Password Hashing', () => {
    // TODO: revise script in sheet
    // TODO: Fill up code
});

// Test Case 3: User Input Validation for Register
// TODO: Fill up code
// Test Case 4: Mobile Responsiveness
// TODO: Fill up code
// Test Case 5: Verify Session management
// TODO: Fill up code
// Test Case 6: Remember Me
// TODO: Fill up code