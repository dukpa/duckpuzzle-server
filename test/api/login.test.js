const { expect, request } = require('chai');
const app = require('app');

describe.only('/login', function() {
  it('should return a token', async function() {
    let user = 'test@example.com';
    let password = 'test';
    let res = await request(app).post('/login').send({
      email: user,
      password
    });
    expect(res).status(200);
    expect(res.body.data.token).to.be.string;
  });

  it('should raise 401 if failed login', async function() {
    let user = 'fake_user@example.com';
    let password = 'test';
    let res = await request(app).post('/login').send({
      email: user,
      password
    });
    expect(res).status(401);
    expect(res.body.error).to.contain({
      code: 'BAD_USER_PASS'
    });
  });
});