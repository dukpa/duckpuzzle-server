const assert = require('assert');
const {createDraftRequest} = require('services/request/request-service');

describe('RequestService', function() {
  describe('#createDraftRequest', function() {
    it('should create a draft request', async function() {
      let request = await createDraftRequest();
      assert.ok(request);
    });

    it('should create sequential requestNo', async function() {
      let requests = [];
      for (let i = 0; i < 5; i++) {
        let newRequest = await createDraftRequest();
        requests.push(newRequest);
      }
      let requestNos = requests.map(request => request.requestNo);
      assert.deepEqual(requestNos, requestNos.sort());
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
        if (lastValue === value) {
          assert.fail(`matching requestNos ${lastValue} and ${value}`);
        } else {
          assert.ok(true);
        }
      });
    });
  });
});