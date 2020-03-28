const Contact = require('models/static/contact');
const Address = require('models/static/address');
const assert = require('assert');

describe('Contact', function() {
  let contact;

  before(async function() {
    contact = await Contact.findOne({lastName: 'Testerson'});
  });

  describe('Schema', function() {
    it('has fields', function() {
      assert.equal(contact.firstName, 'Test');
      assert.equal(contact.middleName, 'T');
      assert.equal(contact.lastName, 'Testerson');
      assert.equal(contact.email, 'test@test.com');
      assert.equal(contact.phone, '555-555-5555');
    });

    it('requires firstName, lastName', function() {
      let contact = new Contact({});
      let err = contact.validateSync();
      assert.ok(err.errors['firstName']);
      assert.ok(err.errors['lastName']);
    });

    it('has an address', async function() {
      contact.address =  new Address({
        address1: '1234 5th St',
        city: 'Miami',
        state: 'Florida',
        zip: '33317'
      });
      await contact.address.save();
      await contact.save();
      contact = await Contact.findById(contact.id).populate('address');
      assert.equal(contact.address.address1, '1234 5th St');
    });
  });
});