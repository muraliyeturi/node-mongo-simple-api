let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//User schema definition
let UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true},
    password: { type: String, required: true},
    createdDate: { type: Date, default: Date.now },
    lastModifiedDate: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', next => {
  now = new Date();
  if(!this.createdDate) {
    this.createdDate = now;
  }
  next();
});

//Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('user', UserSchema);
