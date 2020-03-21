const Client = require('models/client');
const Contact = require('models/contact');
const assert = require('assert');

describe('Client', function() {
  let contact = new Contact({
    firstName: 'Test',
    lastName: 'Testerson',
  });
  let client = new Client({
    name: 'Client Inc.',
    contacts: [contact]
  });

  describe('Schema', function() {
    it('should contain fields', function() {
      assert.equal(client.name, 'Client Inc.');
    });
  
    it('should contain contacts', function() {
      assert.deepEqual(client.contacts, [contact]);
    });

    it('should require name', function() {
      let client = new Client();
      let err = client.validateSync();
      assert.ok(err.errors['name']);
    });
  })
});