const assert = require('assert');
const {RequestSample, RequestTest} = require('models/request');
const {Test} = require('models/static');

describe('RequestTest', function() {
  let requestTest = new RequestTest();

  describe('Schema', async function() {
    it('should require sample and test', async function() {
      try {
        await requestTest.validate();
        assert.fail();
      } catch(err) {
        assert.ok(err.errors['sample']);
        assert.ok(err.errors['test']);
      }
    });

    it('should save with sample and test', async function() {
      requestTest.sample = new RequestSample();
      requestTest.test = new Test();
      try {
        await requestTest.validate();
        assert.ok(true);
      } catch(e) {
        assert.fail();
      }
    });
  });
});