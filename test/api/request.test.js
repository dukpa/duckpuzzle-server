const {expect, request} = require('chai');
const app = require('app');

describe('hello', function() {
  it('should receive put', async function() {
    let res = await request(app).put('/request');
    expect(res).status(200);
    expect(res.body.data.kind).to.equal('Request');
    expect(res.body.data.items[0]).to.deep.include({
      phantom: true,
      samples: []
    });
  });
});