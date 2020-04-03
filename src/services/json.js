const mongoose = require('mongoose');

function _buildResponse(req, data, error) {
  let json = {
    url: req.path,
    method: req.method,
    params: req.params
  };

  if (data) {
    json.data = data;
  } else if (error) {
    json.error = error;
  }
  return json;
}

function buildResponse(req, data) {
  if (data instanceof mongoose.Document) {
    return _buildResponse(req, {
      kind: data.constructor.modelName,
      items: [data.toObject()]
    });
  } else if (Array.isArray(data)) {
    throw 'Not implemented'
  } else if (typeof data === 'object') {
    return _buildResponse(req, data);
  } else {
    throw 'Not implemented'
  }
}

function buildErrorResponse(req, error) {
  return _buildResponse(req, null, error);
}

module.exports = {
  buildResponse,
  buildErrorResponse
}