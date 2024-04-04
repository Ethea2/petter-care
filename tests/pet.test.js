const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// constants
const payload = { _id: 'fakeuserid' };
//process.env.SECRET

const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "3w" });

// models
const petPath = '../backend/src/models/';
const petModel = require('../backend/src/models/pet.model.ts').default;

// APIs
const apiPath = '../backend/src/api/';
const petController = require(apiPath + 'controllers/pet.controller'); 


describe('Feature Retrieve Pet Records', () => {
    let res, req, petRetrieveStub, petRetrieveSpy;
    let error = new Error({ error: 'Some error message' });


    // Setup before each test case
    beforeEach(() => {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };
        res.status.returns({ json: sinon.spy() });
        req = {
            params: {
            id: 'some_pet_id'
            }
        };
    });

    afterEach(() => {
        petRetrieveStub.restore();
        petRetrieveSpy.restore();
    });

    it('Successfully Retrieve pet profile',async () => {
        // Arrange
        const mockPetData = {
            name: "Luna",
            breed: "Golden Retriever",
            birthday: new Date("2020-05-12"),
            sex: "Female",
            age: 4,
            medicalRecords: [],
            wants: ["Belly rubs", "Long walks"],
            hates: ["Thunderstorms", "Baths"],
            vetVisits: [],
            notes: ["Loves to play fetch!"]
        };
        
        petRetrieveStub = sinon.stub(petModel, 'getPet').resolves(mockPetData);
        petRetrieveSpy = sinon.spy(petController, 'getPet');
        
        // Act
        await petController.getPet(req, res);

        // Assert
        sinon.assert.calledOnce(petRetrieveStub);
        sinon.assert.calledWith(petRetrieveStub, req.params.id);
        sinon.assert.calledOnce(petRetrieveSpy);

        //sinon.assert.calledWith(petRetrieveStub, req);
        sinon.assert.calledOnce(petController.getPet);
        sinon.assert.calledWith(petController.getPet, req, res);
        console.log(req.params);
        console.log("The res is ", res.status);
        sinon.assert.calledWith(res.status, 200);
        /*
        sinon.assert.calledOnceWithExactly(res.json, {
            message: 'success',
            data: mockPetData
        });*/
    });

    it('Should handle errors when retrieving pet profile', () => {
        // Arrange
        //const errorMessage = 'Error retrieving pet profile';
        //const error = new Error(errorMessage);
        
        
        petRetrieveStub = sinon.stub(petModel, 'getPet').throws(error);
        petRetrieveSpy = sinon.spy(petController, 'getPet');

        // Act
        petController.getPet(req, res);

        // Assert
        sinon.assert.calledOnce(petRetrieveStub);
        sinon.assert.calledOnce(petRetrieveSpy);

        //sinon.assert.calledWith(petRetrieveStub, req);
        sinon.assert.calledOnceWithExactly(res.status, 500);
    });
});

describe('Uploading pet records', () => {
    let res, req, addPicStub, petControllerSpy;
    let error = new Error({ error: 'Some error message' });
  
    beforeEach(() => {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };
  
      req = {
        headers: {},
      };
    });
  
    afterEach(() => {
      petControllerSpy.restore();
    });
  
    describe('Uploading pet records while not logged in', () => {
      beforeEach(() => {
        res = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };
  
        req = {
          headers: {},
        };
      });
  
      it('Should return status 401', async () => {
        req = {
          headers: {},
        };
        req.body = {
            name: 'Luna',
            breed: 'Golden Retriever',
            age: 4,
            bday: '2020-05-12',
            sex: 'Female',
          };
  
        // Arrange
        petControllerSpy = sinon.spy(petController, 'addPetWithPic');
  
        // Act
        await petController.addPetWithPic(req, res);
  
        // Assert
        sinon.assert.calledOnce(petControllerSpy);
        sinon.assert.calledWith(petControllerSpy, req, res);
        sinon.assert.calledWith(res.status, 401); // Assert 401 for missing authorization
        sinon.assert.calledWith(res.json, { message: 'Token required!' });
      });
    });
  
    describe('Uploading pet records with missing files', () => {
      it('Should return status 500 with appropriate message', async () => {
        // Arrange
        petControllerSpy = sinon.spy(petController, 'addPetWithPic');
        req.headers = { authorization: 'Bearer ' + token };
        
        req.body = {
          name: 'Luna',
          breed: 'Golden Retriever',
          age: 4,
          bday: '2020-05-12',
          sex: 'Female',
        };
        
  
        // Act
        await petController.addPetWithPic(req, res);
       
  
        // Assert
        
        sinon.assert.calledOnce(petControllerSpy);
        sinon.assert.calledWith(petControllerSpy, req, res);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(res.json, { message: 'no file received' });
      });
    });
  
    describe('Uploading pet records with valid data and file', () => {
      it('Should return status 200 with success message and pet data', async () => {
        const mockUploadedFile = {
          tempFilePath: 'path/to/temp/file.jpg',
        };
        
        req.files = { img: mockUploadedFile };
        req.body = {
          name: 'Luna',
          breed: 'Golden Retriever',
          age: 4,
          bday: '2020-05-12',
          sex: 'Female',
        };
        req.headers = { authorization: 'Bearer ' + token };

        petControllerSpy.restore()
        petControllerSpy = sinon.spy(petController, 'addPetWithPic');
  
        // Mocks (replace with your actual implementation)
        const mockPet = { name: 'Luna', ...req.body };
        stub = sinon.stub(petModel, 'addPetsWithPic').resolves(mockPet);
        
        // Act
        await petController.addPetWithPic(req, res);
  
        
        // Assert
        sinon.assert.calledOnce(stub);
        sinon.assert.calledOnce(petControllerSpy);
        sinon.assert.calledWith(petControllerSpy, req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.json, { message: 'success', data: mockPet });
      });
    });
  });
  
