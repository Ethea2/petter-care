// required libraries
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// constants
const payload = { _id: 'fakeuserid' };
const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "3w" });

// Models
const modelPath = '../backend/src/models/';
const postModel = require(modelPath + 'post.model.ts').default;


// APIs
const apiPath = '../backend/src/api/';
const authController = require(apiPath + 'controllers/auth.controller');
const postController = require(apiPath + 'controllers/post.controller.ts');


// Test case 1
describe('The user must be logged in to create a post', () =>{
    // Failing test case
    let error = new Error({ error: 'Some error message' });
    let res, req, postStub, postControllerSpy;
    describe('Create a Post while not logged in', () =>{
        beforeEach(() =>{
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis() 
            };

            req = {
                headers:{}
            };
        });
        
        afterEach(() =>{
            postStub.restore();
            postControllerSpy.restore();
        });

        it('Should return status 401', async () =>{
            // Arrange
            postStub = sinon.stub(postModel, 'addPost').yields(error);
            postControllerSpy = sinon.spy(postController, 'uploadPost');
            // Act
            await postController.uploadPost(req, res);
            // Assert
            sinon.assert.calledOnce(postControllerSpy);
            sinon.assert.calledWith(postController.uploadPost, req, res);
            sinon.assert.calledWith(res.status, 401);
        });

        it('should return status 401 if the user also attaches image(s)', async () =>{
            // Arrange
            postStub = sinon.stub(postModel, 'addPostWithPicture').yields(error);
            postControllerSpy = sinon.spy(postController, 'uploadPost');
            // Act
            await postController.uploadPost(req, res);
            // Assert
            sinon.assert.calledOnce(postControllerSpy);
            sinon.assert.calledWith(postController.uploadPost, req, res);
            sinon.assert.calledWith(res.status, 401);
        });
    });
    
    describe('Create a post while logged in', () =>{
        
        beforeEach(() =>{
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis() 
            };

            req = {
                headers: {
                    authorization: `Bearer ${token}`
                },
                body:{
                    "title": "Your Title",
                    "body": "Your Body"
                }
            };
        });
        
        afterEach(() =>{
            postStub.restore();
            postControllerSpy.restore();
        });

        it('should return status 200 and return a post object', async () =>{
            // Arrange
            const postData = {
                title: "Mock Post Title",
                body:  "Mock post body content",
                upvotes: [],
                comments: []
            };    
            postStub = sinon.stub(postModel, 'addPost').resolves(postData);
            postControllerSpy = sinon.spy(postController, 'uploadPost');
            // Act
            await postController.uploadPost(req, res);
            // Assert
            sinon.assert.calledOnce(postControllerSpy);
            sinon.assert.calledWith(postController.uploadPost, req, res);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json, postData);
        });

        it('should return status 200 and return the post object if it has an image attached', async () =>{
             // Arrange
             const postData = {
                title: "Mock Post Title",
                body:  "Mock post body content",
                image: "mock-image-url.jpg",
                upvotes: [],
                comments: []
            };   
            postStub = sinon.stub(postModel, 'addPostWithPicture').yields(postData);
            postControllerSpy = sinon.spy(postController, 'uploadPost');
            
             // Act
            console.log(req);
            await postController.uploadPost(req, res);

            // Assert
            console.log(req.body);
            sinon.assert.calledOnce(postControllerSpy);
            sinon.assert.calledWith(postController.uploadPost, req, res);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json, postData);
        });

        it('should return status 500 if there is an upload error', async () =>{
            // Arrange
            const postData = {
               title: "Mock Post Title",
               body:  "Mock post body content",
               image: "mock-image-url.jpg",
               upvotes: [],
               comments: []
           };   
           postStub = sinon.stub(postModel, 'addPostWithPicture').yields(error);
           postControllerSpy = sinon.spy(postController, 'uploadPost');
           
            // Act
           console.log(req);
           await postController.uploadPost(req, res);

           // Assert
           console.log(req.body);
           sinon.assert.calledOnce(postControllerSpy);
           sinon.assert.calledWith(postController.uploadPost, req, res);
           sinon.assert.calledWith(res.status, 500);
           
       });
       it('should return status 200 and return the post object if it has an image attached', async () =>{
             // Arrange
             const postData = {
                title: "Mock Post Title",
                body:  "Mock post body content",
                image: "mock-image-url.jpg",
                upvotes: [],
                comments: []
            };   
            postStub = sinon.stub(postModel, 'addPostWithPicture').yields(error);
            postControllerSpy = sinon.spy(postController, 'uploadPost');
            
             // Act
            console.log(req);
            await postController.uploadPost(req, res);

            // Assert
            console.log(req.body);
            sinon.assert.calledOnce(postControllerSpy);
            sinon.assert.calledWith(postController.uploadPost, req, res);
            sinon.assert.calledWith(res.status, 500);
            
        });


    });   

});
