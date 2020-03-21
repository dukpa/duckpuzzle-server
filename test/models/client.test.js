const Client = require('models/static/client');
const assert = require('assert');

describe('Client', function() {
  let client;
  before(async function() {
    client = await Client.findOne({name: 'Client Inc.'}).populate('contacts');
  });

  describe('Schema', function() {
    it('should contain fields', function() {
      assert.equal(client.name, 'Client Inc.');
    });
  
    it('should contain contacts', function() {
      assert.equal(client.contacts.length, 2);
      assert.equal(client.contacts[0].lastName, 'Testerson');
    });

    it('should require name', function() {
      let client = new Client();
      let err = client.validateSync();
      assert.ok(err.errors['name']);
    });
  })
});