const config = require("config");
const mongoose = require("mongoose");

module.exports = async function load() {
  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect(config.get('mongokey'), { useNewUrlParser: true });
    console.log("Connected to MongoDB...");
  } catch(err) {
    console.error(err);
  }
}