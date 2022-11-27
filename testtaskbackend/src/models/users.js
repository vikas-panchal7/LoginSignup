const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    dob: { type: String, trim: true, required: true},
    mobile: { type: Number, trim: true, required: true},
    password: {
      type: String,
      trim: true,
      required: true,
    },
    address: { type: String, trim: true, required: true, lowercase: true },
    city: { type: String, trim: true, required: true, lowercase: true },
    pincode: { type: Number, trim: true, required: true },
    profile: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);


userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  return userObject;
};

userSchema.methods.generateAuthtoken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN);
  return token;
};

userSchema.statics.findByCredentails = async (email, password) => {
  console.log("reqss",email,password)
  const user = await User.findOne({ email });
   console.log("user",user);
  if (!user) {
    throw new Error("Incorrect Email or Password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect Email or Password");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
