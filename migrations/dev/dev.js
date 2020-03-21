const mongoose = require("mongoose");

const data = [
  {
    name: 'Test',
    path: '../../src/models/static/test',
    items: [
      {
        name: 'Cholesterol'
      },
      {
        name: 'Blood Glucose'
      },
      {
        name: 'Billirubin'
      }
    ]
  },
  {
    name: 'Unit',
    path: '../../src/models/static/unit',
    items: [
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
    ]
  },
  {
    name: 'Contact',
    path: '../../src/models/static/contact',
    items: [
      {
        firstName: 'Test',
        middleName: 'T',
        lastName: 'Testerson',
        email: 'test@test.com',
        phone: '555-555-5555'
      },
      {
        firstName: 'Jigme',
        middleName: 'S',
        lastName: 'Dukpa',
        email: 'jigme.dukpa@example.com',
        phone: '123-456-7890'
      }
    ]
  },
  {
    name: 'Client',
    path: '../../src/models/static/client',
    items: [
      {
        name: 'Client Inc.',
        contacts: [
          {
            _model: 'Contact',
            firstName: 'Test',
            middleName: 'T',
            lastName: 'Testerson',
            email: 'test@test.com',
            phone: '555-555-5555'
          },
          {
            _model: 'Contact',
            firstName: 'Jigme',
            middleName: 'S',
            lastName: 'Dukpa',
            email: 'jigme.dukpa@example.com',
            phone: '123-456-7890'
          }
        ]
      }
    ]
  }
];

async function buildModelInstance(Model, data) {
  let fields = Object.keys(data).filter(key => typeof data[key] !== 'object');
  let joins = Object.keys(data).filter(key => typeof data[key] === 'object');
  let config = {};
  fields.forEach(key => config[key] = data[key]);
  for (let key of joins) {
    let children = data[key];
    config[key] = [];
    for (let child of children) {
      let _model = mongoose.models[child._model];
      delete child._model;
      let _instance = await _model.findOne(child);
      config[key].push(_instance);
    }
  }
  return new Model(config);
}

async function doMigration() {
  console.log('Beginning Dev data migration');
  for (let model of data) {
    console.log(`Migrating ${model.name}`);
    const Model = require(model.path);
    await Model.deleteMany({});
    for (item of model.items) {
      let instance = await buildModelInstance(Model, item);
      await instance.save();
    }
    console.log(`Done migrating ${model.name}`)
  }
  // await Promise.all(data.map(async (model) => {
  //   console.log(`Migrating ${model.name}`);
  //   const Model = require(model.path);
  //   await Model.deleteMany({});
  //   await Promise.all(model.items.map((item) => {
  //     return buildModelInstance(Model, item)
  //       .then(doc => doc.save());
  //   }));
  //   console.log(`Done migrating ${model.name}`)
  // }));

  console.log('Data migration complete');
}

module.exports = doMigration;