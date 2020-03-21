const assert = require('assert');
const { User, validate } = require('models/user');

describe('User', function() {
  describe('#Schema', function() {
    it('should contain name, email, password', function() {
      let user = new User({
        name: 'Fake Name',
        email: 'fake@email.com',
        password: 'badpass'
      });
      assert.equal(user.name, 'Fake Name');
      assert.equal(user.email, 'fake@email.com');
      assert.equal(user.password, 'badpass');
    });
    
    it('should require name, email, password', async function() {
      let user = new User();
      let err = user.validateSync();
      assert.ok(err.errors['name'].message.includes('required'));
      assert.ok(err.errors['email'].message.includes('required'));
      assert.ok(err.errors['password'].message.includes('required'));
    });
  });

  describe('#generateAuthToken', function() {
    it('should generate an auth token', function() {
      let user = new User({
        name: 'Fake Name',
        email: 'fake@email.com',
        password: 'badpass'
      });
      let token = user.generateAuthToken();
      assert.equal(typeof token, 'string');
    });
  });

  describe('#authenticate', function() {
    it('should authenticate correct user/pass', async function() {
      let user = new User({
        name: 'Fake Name',
        email: 'fake@email.com'
      });
      await user.setPassword('badpass');
      let token = await user.authenticate('badpass');
      assert.ok(token);
    });

    it('should not authenticate incorrect user/pass', async function() {
      let user = new User({
        name: 'Fake Name',
        email: 'fake@email.com'
      });
      await user.setPassword('badpass');
      let token = await user.authenticate('worsepass');
      assert.ok(!token);
    });
  });

  describe('static#validateUser', function() {
    it('should require password', function() {
      let {error} = validate({
        name: 'Fake Name',
        email: 'fake@email.com'
      });
      assert.equal(error.details[0].message, '"password" is required');
    });

    it('should require email', function() {
      let {error} = validate({
        name: 'Fake Name',
        password: 'badpass'
      });
      assert.equal(error.details[0].message, '"email" is required');
    });

    it('should require name', function() {
      let {error} = validate({
        email: 'fake@email.com',
        password: 'badpass'
      });
      assert.equal(error.details[0].message, '"name" is required');
    });

    it('should require email to be valid', function() {
      let {error} = validate({
        name: 'Fake Name',
        email: 'invalidemail',
        password: 'badpass'
      });
      assert.equal(error.details[0].message, '"email" must be a valid email');
    });

    it('should accept value user', function() {
      let {error} = validate({
        name: 'Fake Name',
        email: 'fake@email.com',
        password: 'badpass'
      });
      assert.ok(!error);
    });
  });
});