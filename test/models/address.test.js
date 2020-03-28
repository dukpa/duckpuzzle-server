const assert = require('assert');

const Address = require('models/static/address');

describe('Address', function() {
  let address = new Address();

  describe('Schema', function() {
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

    it('should have address1, city, state, zip', async function() {
      address.address1 = '1234 5th St';
      address.city = 'Fort Lauderdale';
      address.state = 'Florida';
      address.zip = '12345';
      await address.save();
      address = await Address.findById(address.id);
      assert.equal(address.address1, '1234 5th St');
      assert.equal(address.city, 'Fort Lauderdale');
      assert.equal(address.state, 'Florida');
      assert.equal(address.zip, '12345');
    });
  })
});