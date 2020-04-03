const {expect} = require('chai');
const {login, request} = require('./api-test-utils');

describe.only('/request', async function() {
  let token;

  before(async function() {
    token = await login();
  });

  describe('PUT', function() {
    it('should require authentication', async function() {
      let res = await request().put('/request');
      expect(res).status(401);
      expect(res.body.error).to.contain({
        code: 'MISSING_TOKEN'
      });
    });
  
    it('should return new requests', async function() {
      let res = await request().put('/request').set('x-access-token', token);
      expect(res).status(200);
      expect(res.body.data.kind).to.equal('Request');
      expect(res.body.data.items[0]).to.deep.include({
        phantom: true,
        samples: []
      });
    });
  })
});