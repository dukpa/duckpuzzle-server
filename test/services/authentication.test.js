const {expect} = require('chai');
const {login, authenticate} = require('services/authentication');

describe('authentication', function() {
  const user = 'test@example.com';
  const password = 'test';
  let token;

  describe('#login', function() {
    it('should reject bad username and pass', async function() {
      try {
        await login('fake_user_123', 'fake_pass');
        expect.fail();
      } catch(e) {
        expect(e.code).to.equal('BAD_USER_PASS');
      }
    });

    it('should reject good user name with bad pass', async function() {
      try {
        await login(user, 'bad_pass');
        expect.fail();
      } catch(e) {
        expect(e.code).to.equal('BAD_USER_PASS');
      }
    });

    it('should return a token on successful login', async function() {
      token = await login(user, password);
      expect(token).to.be.a('string');
    });
  });

  describe('#authenticate', function() {
    it('should authenticate a valid token', function() {
      let res = authenticate(token);
      expect(res._id).to.not.be.null;
    });
  });
});