const config = require("config");
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

module.exports = async function load(silent) {
  try {
    silent || console.log("Connecting to MongoDB...")
    await mongoose.connect(config.get('mongokey'), { useNewUrlParser: true });
    silent || console.log("Connected to MongoDB...");
  } catch(err) {
    console.error(err);
  }
}