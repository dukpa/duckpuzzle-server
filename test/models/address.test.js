const assert = require('assert');

const Address = require('models/static/address');

describe('Address', function() {
  let address = new Address();

  it('should require address1, city, state, zip', async function() {
    try {
      await address.save();
      assert.fail('address.save should not be successful');
    } catch(err) {
      assert.ok(err.errors['address1']);
      assert.ok(err.errors['city']);
      assert.ok(err.errors['state']);
      assert.ok(err.errors['zip']);
    }
  });
});