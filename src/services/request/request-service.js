const {Request} = require('models/request');

module.exports.createDraftRequest = async function createDraftRequest() {
  let request = new Request();
  request.requestNo = await getNextRequestNo();
  await request.save();
  return request.toObject();
}

async function getNextRequestNo() {
  let request = await Request.findOne({}).sort('-requestNo');
  if (request) {
    let nextRequestNo = parseInt(request.requestNo) + 1;
    return String(nextRequestNo);
  }
  return '1';
}