// required libraries
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// Constants
const payload = { _id: 'fakeuserid' };
const token = jwt.sign(payload, "stsweng", { expiresIn: "3w" });

// Models
const modelPath = '../backend/src/models/';
const userModel = require(modelPath + 'user.model.ts').default;

// APIs
const apiPath = '../backend/src/api/';
const userController = require(apiPath + 'controllers/user.controller.ts')


describe('The retrieved user profile should load regardless if the current user is logged in or not', () =>{
    const mockUser = {
        username: 'mockusername',
        picture: 'mockpicture.jpg',
        pets:{},
        posts:{}
    };
    describe('Retrieving without logging in', () =>{
        let res, req, userStub, userControllerSpy;
        
        beforeEach(() =>{
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis() 
            };

            req = {
                headers:{},
                params: {
                    _id: "sampleidhere"
                }
            };
        });

        afterEach(() =>{
            userStub.restore();
            userControllerSpy.restore();
        });

        it('should retrievie the user profile and return status 200', async() =>{
            // Arrange
            userStub = sinon.stub(userModel, 'getUser').resolves(mockUser);
            userControllerSpy = sinon.spy(userController, 'getSingleUser');

            // Act
            await userController.getSingleUser(req, res);

            // Assert
            sinon.assert.calledOnce(userControllerSpy);
            sinon.assert.calledWith(userController.getSingleUser, req, res);
            sinon.assert.calledWith(res.status, 200);
            userStub.restore();
            userControllerSpy.restore();
        }); 
    });

    describe('Retrieving while logging in', () =>{
        let res, req, userStub, userControllerSpy;
        
        beforeEach(() =>{
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis() 
            };

            req = {
                headers:{
                    authorization: `Bearer ${token}`
                },
                params: {
                    _id: "sampleidhere"
                }
            };
        });

        afterEach(() =>{
            userStub.restore();
            userControllerSpy.restore();
        });
        
        it('should retrievie the user profile and return status 200', async() =>{
            // Arrange
            userStub = sinon.stub(userModel, 'getUser').resolves(mockUser);
            userControllerSpy = sinon.spy(userController, 'getSingleUser');

            // Act
            await userController.getSingleUser(req, res);

            // Assert
            sinon.assert.calledOnce(userControllerSpy);
            sinon.assert.calledWith(userController.getSingleUser, req, res);
            sinon.assert.calledWith(res.status, 200);
        });
    });
});