const Contact = require('models/contact');
const assert = require('assert');

describe('Contact', function() {
  let contact = new Contact({
    firstName: 'Test',
    middleName: 'T',
    lastName: 'Testerson',
    email: 'test@test.com',
    phone: '555-555-5555'
  })
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
  });
});