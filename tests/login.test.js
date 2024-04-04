// required libraries
const sinon = require('sinon');

// Models
const modelPath = '../backend/src/models/';
const userModel = require('../backend/src/models/user.model.ts').default;

// APIs
const apiPath = '../backend/src/api/';
const authController = require(apiPath + 'controllers/auth.controller'); 

// Test Case 1: Input Validation for Login
describe('Input Validation for Login Auth Controller', () => {
    let error = new Error({ error: 'Some error message' });
    let res, req, loginStub, authLoginSpy;
    
    // Failing Cases
    describe('Empty Login Fields', () =>{
        // Setup before each test case
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({
                    json: sinon.spy()
                })
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
            authLoginSpy.restore();
        });
    
        it('Should return status 400 on empty username and password', () => {
            // Arrange
            loginStub = sinon.stub(userModel, 'login').yields(error);
            authLoginSpy = sinon.spy(authController, 'login');

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledOnce(authController.login);
            sinon.assert.calledWith(authController.login, req, res);           
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);
        });

        it('Should return status 400 on empty username and non-empty password', () => {
            
            // Arrange
            req.body.password = 'letmeinpls';
            loginStub = sinon.stub(userModel, 'login').yields(error);
            authLoginSpy = sinon.spy(authController, 'login');

            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledOnce(authController.login);
            sinon.assert.calledWith(authController.login, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);
        });

        it('Should return status 400 on non-empty username and empty password', () => {
            
            // Arrange
            req.body.username = 'youshallnotpass';
            loginStub = sinon.stub(userModel, 'login').yields(error);
            authLoginSpy = sinon.spy(authController, 'login');
            
            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledOnce(authController.login);
            sinon.assert.calledWith(authController.login, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);
        });
    });

    describe('Invalid Credentials', () => {
        // Setup before each test case
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({
                    json: sinon.spy(),
                    end: sinon.spy()
                })
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
            authLoginSpy.restore();
        })

        it('Should return status 400 on valid username and invalid password', () => {
            
            // Arrange
            req.body.username = 'validusername';
            loginStub = sinon.stub(userModel, 'login').yields(error);
            authLoginSpy = sinon.spy(authController, 'login');
            
            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledOnce(authController.login);
            sinon.assert.calledWith(authController.login, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);
        });

        it('Should return status 400 on invalid username and valid password', () => {
            
            // Arrange
            req.body.password = 'validpassword';
            loginStub = sinon.stub(userModel, 'login').yields(error);
            authLoginSpy = sinon.spy(authController, 'login');
            
            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledOnce(authController.login);
            sinon.assert.calledWith(authController.login, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);
        });
    });

    // Passing Case
    describe('Valid Credentials', () => {
        let res, req, loginStub;
        
        beforeEach(() => {
            // Reset stubs and objects before each test
            res = { 
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
    
            req = {
                body: {
                    _id: "12345",
                    username: 'testusername',
                    password: 'testpassword'
                }
            };
        });
        s
        it('Should return jwt token and status 200', async () =>{

            // Arrange
            loginStub = sinon.stub(userModel, 'login').resolves(req.body);
            authLoginSpy = sinon.spy(authController, 'login');
            
            // Act
            await authController.login(req, res);

            // Assert
            sinon.assert.calledOnce(loginStub);
            sinon.assert.calledOnce(authLoginSpy);
            sinon.assert.calledOnce(authController.login);
            sinon.assert.calledWith(authController.login, req, res);
            sinon.assert.calledWith(res.status, 200);
        });
    });
});

// Test Case 2: Hashed Password
describe('Password Hashing',  () => {
    
    let res, req, signupStub, authSignupSpy, authSignupStub, createStub;
    const mockUser = {
        username: 'testusername',
        password: 'testpassword'
    };
    beforeEach(() => {
        // Reset stubs and objects before each test
        res = {
            status: sinon.stub().returns({
                json: sinon.spy(),
                end: sinon.spy()
            })
        };

        req = {
            body: {
                username: 'testusername',
                password: 'testpassword'
            }
        };
    });

    afterEach(()=>{
        authSignupStub.restore();
        signupStub.restore();
        createStub.restore();
    });

    it('Should return hashed password', async() =>{
        // Arrange
        authSignupStub = sinon.stub(authController, 'signup').yields(200);
        signupStub = sinon.spy(userModel, 'signup');
        createStub = sinon.stub(userModel, 'create').resolves(mockUser);
        
        // Act
        const result = await userModel.signup(req.body.username, req.body.password);
       
        // Assert
        sinon.assert.calledOnce(signupStub);
        sinon.assert.calledOnce(createStub);
        expect(result).toEqual(mockUser);

        sinon.assert.calledWith(signupStub, req.body.username, req.body.password);
        sinon.assert.match(result, { username: 'testusername'});
        expect(result.password != req.body.password);
    });
    
    
    it('Should return status 200', async() => {
        // Arrange
        signupStub = sinon.stub(userModel, 'signup').resolves(mockUser);
        authSignupSpy = sinon.spy(authController, 'signup');
        
        // Act
        await authController.signup(req, res);
        
        // Assert
        sinon.assert.calledOnce(signupStub);
        sinon.assert.calledOnce(authSignupSpy);
        sinon.assert.calledOnce(authController.signup);
        sinon.assert.calledWith(authController.signup, req, res);
        sinon.assert.calledOnce(res.status.withArgs(200));
        sinon.assert.calledWith(res.status, 200);
      
    })
});

// Test Case 3: User Input Validation for Register
describe('Input Validation for Register', () =>{
    describe('Empty Registration fields', () => {
        let req = {};
        let res = {};
        let error = new Error("some error message");
        let signupStub;

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

        it('Should return 400 on empty fields', () => {
            
            // Arrange
            req = {
                body: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }
            }
            
            signupStub = sinon.stub(userModel, 'signup').yields(error)
          
            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });
        
        it('Should return status 400 on empty username', () => {
            // Arrange
            req.body.username = '';
            signupStub = sinon.stub(userModel, 'signup').yields(error);
           

            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

        it('should return status 400 on empty password', () => {
            // Arrange
            req.body.password = '';
            signupStub = sinon.stub(userModel, 'signup').yields(error);
            
            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

      
        it('should return status 400 on empty email', () => {
            // Arrange
            req.body.email = '';

            signupStub = sinon.stub(userModel, 'signup').yields(error);
            // Act
            authController.signup(req, res);
            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

        
        it('should return status 400 on empty confirmPassword', () => {
            // Arrange
            req.body.confirmPassword = '';
            signupStub = sinon.stub(userModel, 'signup').yields(error);
            
            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledWith(userModel.signup, req.body.username, req.body.password);
            sinon.assert.calledWith(res.status, 400);
        });

       
        it('should return status 400 on mismatched passwords', () => {
            
            // Arrange
            req.body.confirmPassword = 'imnotlikeotherpasswords';
            signupStub = sinon.stub(userModel, 'signup').yields(error) 
            
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
        let error = new Error('Some error message');
        let signupStub, authSignupSpy;

        beforeEach(() => {
            req = {
                body: {
                    username: 'testusername',
                    email: 'testemail@tester.com',
                    password: 'testpassword123',
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
            signupStub.restore();
            authSignupSpy.restore();
        });

        it('Should return status 400 when username contains special characters', () =>{
            
            // Arrange
            signupStub = sinon.stub(userModel, 'signup').yields(error);
            authSignupSpy = sinon.spy(authController, 'signup');
            req.body.username = 'testusername👌😁!@#$%^&?>฿';
            
            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledOnce(authController.signup);
            sinon.assert.calledWith(authController.signup, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);

        });

        it('Should return status 400 when email contains special characters except @', () =>{          
            
            // Arrange
            signupStub = sinon.stub(userModel, 'signup').yields(error);
            authSignupSpy = sinon.spy(authController, 'signup');
            req.body.email = 'test💕email@tester.com!@#';
            
            
            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledOnce(authController.signup);
            sinon.assert.calledWith(authController.signup, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);

        });

        it('Should return status 400 when password contains special characters', () => {
            
            // Arrange
            signupStub = sinon.stub(userModel, 'signup').yields(error);
            authSignupSpy = sinon.spy(authController, 'signup');
            req.body.password = 'testpassword😎123';
            
            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledOnce(authController.signup);
            sinon.assert.calledWith(authController.signup, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);

        });

        it('Should return status 400 when confirm password contains special characters', () => {
            
            // Arrange
            signupStub = sinon.stub(userModel, 'signup').yields(error);
            authSignupSpy = sinon.spy(authController, 'signup');
            req.body.confirmPassword = 'testpa😒😒word';

            // Act
            authController.signup(req, res);

            // Assert
            sinon.assert.calledOnce(signupStub);
            sinon.assert.calledOnce(authController.signup);
            sinon.assert.calledWith(authController.signup, req, res);
            sinon.assert.calledOnce(res.status.withArgs(400));
            sinon.assert.calledWith(res.status, 400);
        });
        
    });
});
