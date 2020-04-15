const {expect} = require('chai');
const {getClients} = require('services/client-service');
const Client = require('models/static/client');

describe('Client Service', function () {
  describe('#getClients', function() {
    it('should receive an array of clients', async function() {
      let clients = await getClients();
      expect(clients).to.have.length.greaterThan(0);
      for (let client of clients) {
        expect(client).to.be.instanceOf(Client);
      }
    });
  });
});