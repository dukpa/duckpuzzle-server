const assert = require('assert');
const uuid = require('uuid');
const Counter = require('models/counter');

describe('Counter', function() {
  let _id = uuid.v4();

  describe('Schema', function() {
    it('should contain _id and value', function() {
      let counter = new Counter({_id});
      counter.save();
      assert.equal(counter._id, _id);
      assert.equal(counter.value, 1);
    });
  });

  describe('#getNextValue', function() {
    it('should produce sequential values', async function() {
      let values = [];
      for (let i = 0; i < 5; i++) {
        let value = await Counter.getNextValue(_id);
        values.push(value);
      }
      values.reduce((prev, curr) => {
        prev = prev || 0;
        assert.ok(curr > prev);
      });
    });

    it('should always produce unique values', async function() {
      let promises = [];
      for (let i = 0; i < 10; i++) {
        let promise = Counter.getNextValue(_id);
        promises.push(promise);
      }
      let values = await Promise.all(promises);
      values.sort().reduce((prev, curr) => {
        assert.ok(prev !== curr);
      });
    })
  });

  after(async function() {
    await Counter.findByIdAndDelete(_id);
  });
});