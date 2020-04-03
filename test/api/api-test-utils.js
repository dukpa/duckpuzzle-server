const chai = require('chai');
const app = require('app');

//builds an authenticated request from a token
function request() {
  return chai.request(app);
}

async function login() {
  let user = 'test@example.com';
  let password = 'test';
  let res = await request(app).post('/login').send({
    email: user,
    password
  });
  return res.body.data.token;
}

module.exports = {
  request,
  login
}