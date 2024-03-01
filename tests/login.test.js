// required libraries
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            sinon.assert.calledOnce(res.status(400).end);
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
        let res, req, loginStub;
        
        beforeEach(() => {
            // Reset stubs and objects before each test
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
    
            req = {
                body: {
                    username: 'testusername',
                    password: 'testpassword'
                }
            };
        });

        it('Should return jwt token and status 200', async() =>{
            // Arrange
            const mockUserId = 'some-user-id'; 
            const mockUser = { _id: mockUserId };

            loginStub = sinon.stub(authController, 'login');

        
            const test = await authController.login(req, res);

            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledWith(loginStub, req);
            sinon.assert.calledWith(res.status, 200);
        });
    });
});

// Test Case 2: Hashed Password
describe('Password Hashing', () => {
    // TODO: revise script in sheet
    let res, req, signupStub;
    beforeEach(() => {
        // Reset stubs and objects before each test
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };

        req = {
            body: {
                username: 'testusername',
                password: 'testpassword'
            }
        };
    });
    afterEach(()=>{
        signupStub.restore();
    })
    it('Should return hashed password', async() =>{
        // Arrange
        const salt = await bcrypt.genSalt(12);
        const expectedHash = await bcrypt.hash('testpassword', salt);

        signupStub = sinon.stub(userModel, 'signup');
        signupStub.resolves({username: 'testusername', password: expectedHash});
        
        // Act
        const result = await userModel.signup(req.body.username, req.body.password);
       
        // Assert
        sinon.assert.calledOnce(signupStub);
        sinon.assert.calledWith(signupStub, req.body.username, req.body.password);
        sinon.assert.match(result, { username: 'testusername', password: expectedHash });
        
    });
    // TODO: this still fails
    it('Should return status 200', async() => {
        // Arrange
        signupStub = sinon.stub(authController, 'signup').resolves({ status: 200 });
        // Act
        const result = await authController.signup(req.body.username, req.body.password);
        // Assert
        sinon.assert.calledOnce(signupStub);
        sinon.assert.calledWith(signupStub, req.body.username, req.body.password);
        sinon.assert.calledWith(res.status, 200);
    })
});

// Test Case 3: User Input Validation for Register
describe('Input Validation for Register', () =>{
    describe('Empty Registration fields', () => {
        let req = {};
        let res = {};

        var signupStub;

        beforeEach(() => {
            req = {
                body: {
                    username: 'testusername',
                    email: 'testemail@tester.com',
                    password: 'testpassword',
                    confirmPassword: 'testpassword'
                }
            }
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis(),
                end: sinon.stub()
            };
        });

        afterEach(() =>{
            signupStub.restore()
        })

        it('Should return 400 on empty fields', async() => {
            // Arrange
            req = {
                body: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }
            }
            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});

            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });
        
        it('Should return status 400 on empty username', async() => {
            // Arrange
            req.body.username = '';
            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});

            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

        it('should return status 400 on empty password', async() => {
            req.body.password = '';

            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});

            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

        // TODO: this should fail but it passes
        it('should return status 400 on empty email', async() => {
            req.body.email = '';

            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});

            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

        // TODO: this should fail but it passes
        it('should return status 400 on empty confirmPassword', async() => {
            req.body.confirmPassword = '';

            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});

            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

        // TODO: this should fail but it passes
        it('should return status 400 on mismatched passwords', async() => {
            // Arrange
            req.body.confirmPassword = 'imnotlikeotherpasswords';
            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});

            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });
    });
    
    describe('Special characters in input fields', () => { 
        let req = {};
        let res = {};

        var signupStub;

        beforeEach(() => {
            req = {
                body: {
                    username: 'testusername👌😁!@#$%^&?>฿',
                    email: 'test💕email@tester.com!@#',
                    password: 'testpassword😎123',
                    confirmPassword: 'testpa😒😒word'
                }
            }
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis(),
                end: sinon.stub()
            };
        });

        afterEach(() =>{
            signupStub.restore()
        });

        it('Should return status 400 when username contains special characters', async() =>{
            // Arrange
            signupStub = sinon.stub(userModel, 'signup').yields({status: 400});
            // Act
            // Assert
        });
    })
});
// Test Case 4: Verify Session management
// TODO: Fill up code
describe('JWT Token testing', () => {
    // let res, req, tokenStub;
    
});
// Test Case 5: Remember Me
// TODO: Fill up code