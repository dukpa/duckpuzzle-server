const {expect, request} = require('chai');
const app = require('app');

describe('hello', function() {
  it('should receive put', async function() {
    let res = await request(app).put('/request');
    expect(res).status(200);
    expect(res.body).to.deep.include({
      phantom: true,
      samples: []
    });
  });
});