const {Request} = require('models/request');
const Counter = require('models/counter');

const REQUEST_COUNTER = 'REQUEST';

module.exports.createDraftRequest = async function createDraftRequest() {
  let request = new Request();
  request.requestNo = await getNextRequestNo();
  await request.save();
  return request;
}

async function getNextRequestNo() {
  return await Counter.getNextValue(REQUEST_COUNTER);
}