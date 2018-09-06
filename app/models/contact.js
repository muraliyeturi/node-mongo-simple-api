let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//User schema definition
let UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    groupId: { type: String, required: true },
    email: { type: String, required: true },
    createdById: { type: String, required: true },
    contactActiveStatus: { type: Boolean, required: false, default: true },
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
  } else if(!this.username) {
    this.username = this.email;
  }
  next();
});

//Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('contact', UserSchema);
