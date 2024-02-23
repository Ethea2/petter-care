const sinon = require('sinon');
const userModel = require('../backend/src/models/user.model');
const authController = require('../backend/src/api/controllers/auth.controllers.ts');
const userController = require('../backend/src/api/controllers/user.controllers.ts');
const authMiddleWare = require('../backend/src/api/middleware/auth.middleware.ts');
const { describe, beforeEach, afterEach } = require('node:test');
const { default: User } = require('../backend/src/models/user.model');
const jwt = require('jsonwebtoken');
const { error } = require('console');

describe('Input Validation For Login', () => {
    // Setup response
    let req = {
        body: {
            username : 'INPUT DATA HERE',
            password : 'INPUT DATA HERE'
        }
    }

    let error = new Error({ error: 'Soup'});

    let res = {};

    let expectedResults;

    describe('login', () =>{
        var loginStub;

        beforeEach(() => {
            // Setup before each test case
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            
        });

        afterEach(() => {
            // Restore loginStub after each test case
            loginStub.restore();
        })

        it('Should return 400 on server error', () => {
            // Arrange
            
            loginStub = sinon.stub(userModel, 'login').yields(error)
           
            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(authController.login, req.body);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledOnce(res.status(400).end);
    
        });

        it('Should return 200 on successful login', () =>{
            // Arrange
            expectedResults = {
                username: 'stswenguser',
                password: 'dropaDB'
            }
            // Act
            authController.login(req, res);

            // Assert
            sinon.assert.calledWith(authController.login, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            
        });
    });
    
    describe('createToken', () =>{
        var tokenStub;

        beforeEach(() => {
            // Setup before each test case
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            
        });

        afterEach(() => {
            // Restore loginStub after each test case
            tokenStub.restore();
        })

        it('should call jwt.sign with correct arguments', () => {
            const  testID = 'REPLACE VALUE';
            const expectedToken = 'mockToken';

            // Arrange
            // Mocking objectID
            sinon.stub(moongose.Types, 'ObjectId').returns(testID);

            // Mocking jwt.sign
            tokenStub = sinon.stub(jwt, 'sign').returns(expectedToken);

            // ACT
            const token = authController.createToken(testID);

            // Assert
            sinon.assert.calledWith(jwt.sign, {_id: testID}, process.env.SECRET, { expiresIn: '3w' } );
            expect(token).toBe(expectedToken);
        })
    });
});

describe('Password isHashed', () => {
    var hashedStub;
    beforeEach(() => {
        // Setup before each test case
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };
        
    });

    afterEach(() => {
        // Restore loginStub after each test case
        hashedStub.restore();
    })

    it('Should hash a password', async () => {
        const password = 'password123';
        // TODO: replace with actual hashing function of dev
        const hashedPassword = await bcrypt.hash(password, 10);
    
        expect(hashedPassword).toBeDefined();
    });    
});

describe('Input Validation For Sign Up', () => {
    var signUpStub; 
    
    beforeEach(() => {
        // before every test case setup first
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };
    });

    afterEach(() => {
        // executed after the test case
        signUpStub.restore();
    });

    let req = {
        body: {
            username: 'stswenguser',
            email: 'myemail@.gmail.com',
            password: 'Random content',
            retypedpassword: 'Random content',
            privacypolicy: true
        }
    };

    
    
    describe('Sign Up with empty credentials', () => {
        let reqEmpty = {
            body: {
                username: '',
                email: '',
                password: '',
                retypedpassword: '',
                privacypolicy: false
            }
        };

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // executed after the test case
            signUpStub.restore();
        });

        it('Empty in all fields', async () => {
            const reqEmpty = {
                body: {
                    username: '',
                    email: '',
                    password: '',
                    retypedpassword: '',
                    privacypolicy: false
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqEmpty)

            authController.signup(reqEmpty, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });
        
        it('Empty in username only', () => {
            const reqUserNameEmpty = {
                body: {
                    username: '',
                    email: 'a@gmail.com',
                    password: 'asdf',
                    retypedpassword: 'asdf',
                    privacypolicy: true
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            
            signUpStub = sinon.stub(userModel, 'signup').yields(reqUserNameEmpty)

            authController.signup(reqUserNameEmpty, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });

        it('Empty in email only', () => {
            const reqEmailEmpty = {
                body: {
                    username: 'asdf',
                    email: '',
                    password: 'asdf',
                    retypedpassword: 'asdf',
                    privacypolicy: true
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqEmailEmpty)

            authController.signup(reqEmailEmpty, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });

        it('Empty in password only', () => {
            const reqPasswordEmpty = {
                body: {
                    username: 'testUser',
                    email: 'test@example.com',
                    password: '', // Empty password
                    retypedpassword: 'test123', 
                    privacypolicy: true
                }
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqPasswordEmpty)
            // Arrange
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            // ACT
            authController.signup(reqPasswordEmpty, res);
            
            // ASSERT
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "SignUp Failed" });
        });

        it('Empty in confirm password only', () => {
            const reqConfirmPasswordEmpty = {
                body: {
                    username: 'asdf',
                    email: 'asdf@gmail.com',
                    password: 'asdf',
                    retypedpassword: '',
                    privacypolicy: true
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqConfirmPasswordEmpty)

            authController.signup(reqConfirmPasswordEmpty, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });

        it('privacy policy is unticked', () => {
            const reqPrivacyPolicyFalse = {
                body: {
                    username: 'asdf',
                    email: 'asdf@gmail.com',
                    password: 'asdf',
                    retypedpassword: 'asdf',
                    privacypolicy: false
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqConfirmPasswordEmpty)

            authController.signup(reqPrivacyPolicyFalse, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });

        it('password and confirm password not the same', () => {
            const reqPasswordNoMatch = {
                body: {
                    username: 'asdf',
                    email: 'asdf@gmail.com',
                    password: 'asdf',
                    retypedpassword: 'asdfasdf',
                    privacypolicy: true
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqPasswordNoMatch)

            authController.signup(reqPasswordNoMatch, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });
    });

    describe('Sign Up with special characters', () => {
        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // executed after the test case
            signUpStub.restore();
        });
        it('Sign Up with special characters in username field', () => {
            const reqSpecialUsername = {
                body: {
                    username: 'user!@#🌙', // Username with special characters
                    email: 'test@example.com',
                    password: 'password123',
                    retypedpassword: 'password123',
                    privacypolicy: true
                }
            };
            // Arrange
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            }
            // ACT
            authController.signup(reqSpecialUsername, res);

            // ASSERT
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });
    
        it('Sign Up with special characters in password field', () => {
            const reqSpecialCharPassword = {
                body: {
                    username: 'asdf',
                    email: 'asdf@gmail.com',
                    password: '🌙🌙🌙',
                    retypedpassword: 'asdf',
                    privacypolicy: true
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqSpecialCharPassword)

            authController.signup(reqSpecialCharPassword, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });
        
        it('Sign Up with special characters in confirm password field', () => {
            const reqSpecialCharConfirmPassword = {
                body: {
                    username: 'asdf',
                    email: 'asdf@gmail.com',
                    password: 'asdf',
                    retypedpassword: '🌙🌙🌙',
                    privacypolicy: true
                }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            signUpStub = sinon.stub(userModel, 'signup').yields(reqSpecialCharConfirmPassword)

            authController.signup(reqSpecialCharConfirmPassword, res);

            // Add your assertions here based on your application logic
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: "Signup failed" });
        });
    });

    it('Sign Up with invalid email format', () => {
        const reqInvalidEmailFormat = {
            body: {
                username: 'asdf',
                email: 'asdf',
                password: 'asdf',
                retypedpassword: 'asdf',
                privacypolicy: true
            }
        };

        const res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };

        signUpStub = sinon.stub(userModel, 'signup').yields(reqInvalidEmailFormat)

        authController.signup(reqInvalidEmailFormat, res);

        // Add your assertions here based on your application logic
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { error: "Signup failed" });
    });

    it('Sign Up with valid Username, Email,  Password and Confirm Password', () => {
        const reqValidSignup = {
            body: {
                username: 'validuser',
                email: 'valid@example.com',
                password: 'password123',
                retypedpassword: 'password123',
                privacypolicy: true
            }
        };
        // Arrange
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        }

        // ACT
        authController.signup(reqValidSignup, res);

        // ASSERT
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.json, { success: true, message: "Succesfully Signed up"})
    });
    
    
});


describe('Mobile Responsiveness', () => {
    
});

describe('Remember Me', () => {
    
});