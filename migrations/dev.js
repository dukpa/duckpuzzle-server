const mongoose = require("mongoose");
const loadMongoose = require('../src/loaders/mongoose');

const data = [
  {
    name: 'Test',
    path: '../src/models/test',
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
  }
];

async function doMigration() {
  console.log('Beginning Dev data migration');
  await loadMongoose();

  await Promise.all(data.map(async (model) => {
    console.log(`Migrating ${model.name}`);
    const Model = require(model.path);

    console.log('...Scrubbing');
    await Model.deleteMany({});
    console.log('...Done scrubbing');

    console.log('...Creating data');
    await Promise.all(model.items.map((item) => {
      let doc = new Model(item);
      return doc.save();
    }));
    console.log('...Done creating data');
    
    console.log(`Done migrating ${model.name}`)
  }));

  console.log('Disconnecting from mongoose');
  try {
    await mongoose.disconnect();
  } catch(e) {
    console.error(e);
  }

  console.log('Data migration complete');
}

doMigration();