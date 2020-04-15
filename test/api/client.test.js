const {expect} = require('chai');
const {login, request} = require('./api-test-utils');

describe('/clients', function() {
  let token;

  before(async function() {
    token = await login();
  });

  describe('GET', function() {
    it('should receive a list of clients', async function() {
      let res = await request().get('/clients').set('x-access-token', token);
      expect(res).status(200);
      expect(res.body.data.kind).to.equal('Client');
      expect(res.body.data.items[0]).to.include.keys('_id', 'name', 'contacts');
    });

    it('should require authentication', async function() {
      let res = await request().put('/request');
      expect(res).status(401);
      expect(res.body.error).to.contain({
        code: 'MISSING_TOKEN'
      });
    });
  });
});