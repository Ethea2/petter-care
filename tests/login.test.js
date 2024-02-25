// required libraries
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// Models
const modelPath = '../backend/src/models/';
const User = require('../backend/src/models/user.model.ts').default;

// APIs
const apiPath = '../backend/src/api/';
const authController = require(apiPath + 'controllers/auth.controller');
const userController = require(apiPath + 'controllers/user.controller');
const authMiddleWare = require(apiPath + 'middleware/auth.middleware');

// Test Case 1: Input Validation for Login
describe('Input Validation for Login', () => {

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
                    username: null,
                    password: null
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
            loginStub = sinon.stub(User, 'login').throws(error);

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(authController.login, req.body);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledOnce(res.status(400).end);
        });

        // it('Should return status 400 on empty username and non-empty password', () => {
        //     // Arrange
        //     req.body.password = 'letmeinpls';
        //     loginStub = sinon.stub(User, 'login').yields(error);

        //     // Act
        //     authController.login(req, res);

        //     // Assert
        //     sinon.assert.calledWith(authController.login, req.body);
        //     sinon.assert.calledWith(res.status, 400);
        //     sinon.assert.calledOnce(res.status(400).end);
        // });

        // it('Should return status 400 on non-empty username and empty password', () => {
        //     // Arrange
        //     req.body.username = 'youshallnotpass';
        //     loginStub = sinon.stub(User, 'login').yields(error);
            
        //     // Act
        //     authController.login(req, res);

        //     // Assert
        //     sinon.assert.calledWith(authController.login, req.body);
        //     sinon.assert.calledWith(res.status, 400);
        //     sinon.assert.calledOnce(res.status(400).end);
        // });
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
                    username: null,
                    password: null
                }
            };
        });

        it('Should return status 400 on valid username and invalid password', () => {

        });

        it('Should return status 400 on invalid username and valid password', () => {

        })
    })

    // Passing Case
    describe('Valid Credentials', () => {
        it('Should return jwt token and status 200', () =>{
            // Arrange
            const user = { username: 'testuser' };
            const token = 'generated_jwt_token';
            const expectedResponse = { token };

            const req = {
                body: {
                    username: 'validusername',
                    password: 'validpassword'
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis() // This is to support chaining
            };
           
            sinon.stub(User, 'login').returns(user);

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(res.json, expectedResponse);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledOnce(res.status(200).json);
        });
    });
});

// Test Case 2: Hashed Password
// describe('Password Hashing', () => {
//     // TODO: revise script in 
// });

// Test Case 3: User Input Validation for Register

// Test Case 4: Mobile Responsiveness

// Test Case 5: Verify Session management

// Test Case 6: Remember Me