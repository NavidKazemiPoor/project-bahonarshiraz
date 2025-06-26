const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام نمیتواند خالی باشد"],
  },
  email: {
    unique: true,
    type: String,
    required: [true, "ایمیل نباید خالی باشد"],
    validate: {
      validator: validator.isEmail,
      message: "ایمیل معتبر وارد کنید",
    },
  },
  password: {
    type: String,
    required: [true, "پسورد نباید خالی باشد"],
  },
  role: {
    type: String,
    default: "user",
  },
});
UserSchema.pre('save', async function () {
  console.log(true)
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
