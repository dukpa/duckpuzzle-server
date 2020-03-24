const assert = require('assert');
const {Request, RequestSample, RequestTest} = require('models/request');
const {Test} = require('models/static');

describe('RequestSample', function() {
  let sample = new RequestSample({
    internalSampleNo: '123',
    externalSampleNo: '456'
  });

  describe('Schema', async function() {
    it('should require a request', async function() {
      try {
        await sample.validate();
        assert.fail();
      } catch(err) {
        assert.ok(err.errors['request']);
      }
    });

    it('should save with request', async function() {
      sample.request = new Request(); //still bad, request should contain sample
      await sample.save();
    });

    it('should contain basic fields', async function() {
      sample = await RequestSample.findById(sample.id);
      assert.equal(sample.internalSampleNo, '123');
      assert.equal(sample.externalSampleNo, '456');
    });
  });

  describe('#addTest', function() {
    it('should add a test by config', async function() {
      let test = await Test.findOne({name: 'Cholesterol'});
      assert.ok(test);
      let sampleTest = sample.addTest({
        test
      });
      await sampleTest.save();
      await sample.save();
      sample = await RequestSample.findById(sample.id)
        .populate('tests');
      await sample.tests[0].populate('test').execPopulate();
      assert.deepEqual(sample.tests[0].test, test);
    });
  });
});