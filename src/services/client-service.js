const Client = require('models/static/client');

module.exports.getClients = async function getClients() {
  const clients = await Client.find({});
  return clients;
}