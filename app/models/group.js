let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens

//book schema definition
let GroupSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    activeStatus: { type: Boolean, required: false, default: false },
    createdById: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    lastModifiedDate: { type: Date, default: Date.now}
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
GroupSchema.pre('save', next => {
  now = new Date();
  if(!this.createdDate) {
    this.createdDate = now;
  }
  next();
});

//Exports the GroupSchema for use elsewhere.
module.exports = mongoose.model('group', GroupSchema);
