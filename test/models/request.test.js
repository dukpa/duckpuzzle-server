const assert = require('assert');
const Client = require('models/static/client');
const Contact = require('models/static/contact');
const Request = require('models/request/request');

describe.only('Request', function() {
  let request = new Request({
    requestNo: 'this is a test'
  });

  describe('Schema', function() {
    it('should contain fields', async function() {
      assert.equal(request.requestNo, 'this is a test');
      assert.equal(request.phantom, true);
      await request.save();
      assert.ok(true);
    });

    it('should require requestNo', async function() {
      let request = new Request();
      try {
        await request.validate()
      } catch(err) {
        assert.ok(err.errors['requestNo']);
      }
    });

    describe('contactInfo', function() {
      it('should contain fields', async function() {
        let client = await Client.findOne({name: 'Client Inc.'});
        assert.ok(client);
        assert.ok(client.contacts[0])
        let contact = await Contact.findOne({lastName: 'Dukpa'});
        assert.ok(contact);
        request.contactInfo = {
          client,
          contact: client.contacts[0],
          email: 'test@test.com',
          phone: '555-555-5555'
        }
        await request.save();
        assert.equal(request.contactInfo.client, client);
        assert.equal(request.contactInfo.contact, client.contacts[0]);
        assert.equal(request.contactInfo.email, 'test@test.com');
        assert.equal(request.contactInfo.phone, '555-555-5555');
      });
    });

    describe('invoicingInfo', function() {
      it('should contain fields', async function() {
        let client = await Client.findOne({name: 'Client Inc.'});
        assert.ok(client);
        assert.ok(client.contacts[0])
        let contact = await Contact.findOne({lastName: 'Dukpa'});
        assert.ok(contact);
        request.invoicingInfo = {
          client,
          contact: client.contacts[0],
          email: 'test@test.com',
          phone: '555-555-5555'
        }
        await request.save();
        assert.equal(request.invoicingInfo.client, client);
        assert.equal(request.invoicingInfo.contact, client.contacts[0]);
        assert.equal(request.invoicingInfo.email, 'test@test.com');
        assert.equal(request.invoicingInfo.phone, '555-555-5555');
      });
    });
  });
});