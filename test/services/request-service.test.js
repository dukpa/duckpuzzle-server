const {expect} = require('chai');
const {createDraftRequest} = require('services/request/request-service');
const {Request} = require('models/request');

describe('RequestService', function() {
  describe('#createDraftRequest', function() {
    it('should create a draft request', async function() {
      let request = await createDraftRequest();
      expect(request).to.be.instanceOf(Request);
    });

    it('should create sequential requestNo', async function() {
      let requests = [];
      for (let i = 0; i < 5; i++) {
        let newRequest = await createDraftRequest();
        requests.push(newRequest);
      }
      let requestNos = requests.map(request => request.requestNo);
      expect(requestNos).to.equal(requestNos.sort());
    });

    it('should always create unique requestNo', async function() {
      /*
        Make X draft requests in parallel
        Then ensure that no duplicate requestNo values exist
      */
      let promises = [];
      for (let i = 0; i < 10; i++) {
        let promise = createDraftRequest();
        promises.push(promise);
      }
      let requests = await Promise.all(promises);
      let requestNos = requests.map(request => request.requestNo).sort();
      requestNos.reduce((lastValue, value) => {
        expect(lastValue).to.not.equal(value);
      });
    });
  });
});