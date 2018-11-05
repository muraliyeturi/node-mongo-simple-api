
let mongoose = require("mongoose");
let config = require("config");

let db = mongoose.connect(
  config.DBHost,
  config.options
);

db.catch(function(err){
  console.log(err);
})
