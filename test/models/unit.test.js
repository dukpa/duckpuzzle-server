const assert = require('assert');
const Unit = require('models/static/unit');

describe('Unit', function() {
  let unit;

  before(async function() {
    unit = await Unit.findOne({shortName: 'mL'});
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