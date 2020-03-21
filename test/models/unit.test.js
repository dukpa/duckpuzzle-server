const assert = require('assert');
const Unit = require('models/unit');

describe('Unit', function() {
  let unit = new Unit({
    type: 'volume',
    shortName: 'mL',
    longName: 'mililiters'
  });

  describe('Schema', function() {
    it('should contain fields', function() {
      assert.equal(unit.type, 'volume');
      assert.equal(unit.shortName, 'mL');
      assert.equal(unit.longName, 'mililiters');
    });

    it('should require type, shortName, longName', function() {
      let unit = new Unit();
      let err = unit.validateSync();
      assert.ok(err.errors['type']);
      assert.ok(err.errors['shortName']);
      assert.ok(err.errors['longName']);
    });
  });
});