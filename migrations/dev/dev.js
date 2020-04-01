const mongoose = require("mongoose");
const {Address, Client, Contact, Test, Unit, User} = require('models/static');
const {Request} = require('models/request');
const {newUser} = require('services/registration');

const data = {
  tests: [
    {
      name: 'Cholesterol'
    },
    {
      name: 'Blood Glucose'
    },
    {
      name: 'Billirubin'
    }
  ],
  units: [
    {
      type: 'volume',
      shortName: 'mL',
      longName: 'mililiters'
    },
    {
      type: 'weight',
      shortName: 'g',
      longName: 'grams'
    }
  ],
  clients: [
    {
      name: 'Client Inc.',
      contacts: [
        {
          firstName: 'Test',
          middleName: 'T',
          lastName: 'Testerson',
          email: 'test@test.com',
          phone: '555-555-5555',
          address: {
            address1: '1234 5th St',
            address2: 'Suite 6',
            city: 'Four City',
            state: 'Florida',
            zip: '67890'
          }
        },
        {
          firstName: 'Jigme',
          middleName: 'S',
          lastName: 'Dukpa',
          email: 'jigme.dukpa@example.com',
          phone: '123-456-7890',
          address: {
            address1: '321 Zero Ave',
            city: 'Negative City',
            state: 'New York',
            zip: '11215'
          }
        }
      ]
    }
  ],
  requests: []
};

async function scrub() {
  console.log('Scrubbing data');
  let promises = mongoose.modelNames().map(async (modelName) => {
    let model = mongoose.models[modelName];
    console.log(`  Scrubbing ${modelName}`);
    await model.deleteMany({});
    console.log(`  Done scrubbing ${modelName}`);
  });
  await Promise.all(promises);
  console.log('Done scrubbing data');
}

async function migrateTests() {
  console.log('  Migrating tests');
  let promises = data.tests.map(async (config) => {
    let test = new Test(config);
    await test.save();
  });
  await Promise.all(promises);
  console.log('  Done migrating tests');
}

async function migrateUnits() {
  console.log('  Migrating units');
  let promises = data.units.map(async (config) => {
    let unit = new Unit(config);
    await unit.save();
  });
  await Promise.all(promises);
  console.log('  Done migrating units');
}

async function migrateContacts(data) {
  let contactPromises = data.map(async (data) => {
    let address = new Address(data.address);
    let contact = new Contact({
      ...data,
      address
    });
    await address.save();
    await contact.save();
    return contact;
  });
  return await Promise.all(contactPromises);
}

async function migrateClients() {
  console.log('  Migrating clients');
  let clientPromises = data.clients.map(async (data) => {
    let contacts = await migrateContacts(data.contacts);
    let client = new Client({
      ...data,
      contacts: contacts
    });
    await client.save();
  });
  await Promise.all(clientPromises);
  console.log('  Done migrating clients');
}

async function migrateUsers() {
  console.log('  Adding test users');
  await newUser({name: 'Tester', email: 'test@example.com', password: 'test'})
  console.log('  Done adding test users');
}

async function doMigration() {
  console.log('Beginning Dev data migration');
  await Promise.all([
    migrateTests(),
    migrateUnits(),
    migrateClients(),
    migrateUsers()
  ])
  console.log('Data migration complete');
}

async function migrate() {
  await scrub();
  await doMigration();
}

module.exports = migrate;