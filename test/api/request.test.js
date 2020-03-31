const {expect, request} = require('chai');
const app = require('app');

describe.only('hello', function() {
  it('should receive put', async function() {
    let res = await request(app).put('/request');
    expect(res).status(200);
    expect(res.body).to.include({phantom: true});
  });
});