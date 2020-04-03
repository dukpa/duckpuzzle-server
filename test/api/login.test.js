const { expect, request } = require('chai');
const app = require('app');

describe('/login', function() {
  describe('POST', function() {
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
  })
});

//utility function for other api tests
module.exports.login = async function() {
  let user = 'test@example.com';
  let password = 'test';
  let res = await request(app).post('/login').send({
    email: user,
    password
  });
  return res.body.data.token;
}