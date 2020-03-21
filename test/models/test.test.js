const assert = require('assert');
const Test = require('models/static/test');

describe('Test', function () {
  let test;

  before(async function() {
    test = await Test.findOne({name: 'Cholesterol'});
  });

  describe('Schema', function() {
    it('should contain fields', function() {
      assert.equal(test.name, 'Cholesterol');
    });
  
    it('should require name', function() {
      let test = new Test();
      let err = test.validateSync();
      assert.ok(err.errors['name']);
    });
  });
});