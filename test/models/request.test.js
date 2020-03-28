const assert = require('assert');
const Client = require('models/static/client');
const Contact = require('models/static/contact');
const {Request, RequestSample} = require('models/request');

describe('Request', function() {
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

    describe('contactInfo', async function() {
      it('should contain fields', async function() {
        let client = await Client.findOne({name: 'Client Inc.'})
          .populate('contacts');
        assert.ok(client);
        assert.ok(client.contacts[0]);
        let contact = await Contact.findOne({lastName: 'Testerson'});
        assert.ok(contact);
        request.contactInfo = {
          client,
          contact,
          email: 'test@test.com',
          phone: '555-555-5555',
          address: contact.address
        }
        await request.save();
        request = await Request.findById(request.id)
          .populate('contactInfo.client')
          .populate('contactInfo.contact')
          .populate('contactInfo.address');
        assert.equal(request.contactInfo.client.name, 'Client Inc.');
        assert.equal(request.contactInfo.contact.lastName, 'Testerson');
        assert.equal(request.contactInfo.email, 'test@test.com');
        assert.equal(request.contactInfo.phone, '555-555-5555');
        assert.equal(request.contactInfo.address.address1, '1234 5th St');
      });
    });

    describe('invoicingInfo', function() {
      it('should contain fields', async function() {
        let client = await Client.findOne({name: 'Client Inc.'})
          .populate('contacts');
        assert.ok(client);
        assert.ok(client.contacts[0]);
        let contact = await Contact.findOne({lastName: 'Testerson'});
        assert.ok(contact);
        request.invoicingInfo = {
          client,
          contact,
          email: 'test@test.com',
          phone: '555-555-5555',
          address: contact.address
        }
        await request.save();
        request = await Request.findById(request.id)
          .populate('invoicingInfo.client')
          .populate('invoicingInfo.contact')
          .populate('invoicingInfo.address');
        assert.equal(request.invoicingInfo.client.name, 'Client Inc.');
        assert.equal(request.invoicingInfo.contact.lastName, 'Testerson');
        assert.equal(request.invoicingInfo.email, 'test@test.com');
        assert.equal(request.invoicingInfo.phone, '555-555-5555');
        assert.equal(request.invoicingInfo.address.address1, '1234 5th St');
      });
    });

    describe('#addSample', function() {
      it('can add a sample by config', async function() {
        let sample = request.addSample({
          internalSampleNo: 'test1',
          externalSampleNo: 'test2'
        });
        await sample.save();
        await request.save();
        request = await Request.findById(request.id).populate('samples');
        assert.equal(request.samples[0].internalSampleNo, 'test1');
        assert.equal(request.samples[0].externalSampleNo, 'test2');
      });

      it('can add a sample by ref', async function() {
        let sample = new RequestSample({
          internalSampleNo: 'test3',
          externalSampleNo: 'test4'
        });
        let ret = request.addSample(sample);
        assert.equal(sample, ret);
        await sample.save();
        await request.save();
        request = await Request.findById(request.id).populate('samples');
        assert.equal(request.samples[1].internalSampleNo, 'test3');
        assert.equal(request.samples[1].externalSampleNo, 'test4');
      });
    });
  });
});