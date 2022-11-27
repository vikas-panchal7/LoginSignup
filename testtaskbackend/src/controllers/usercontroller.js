const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const signUp = async (req, res) => {
    const adduser = new User({
    ...req.body,
    profile: req.files?.profile[0].path,
    aadhar: req.files?.aadhar[0].path,
  });
  try {
    const newuser = await User.findOne({ email: req.body.email });
    if (newuser) throw new Error("Email is Already Exist");
    await adduser.save();
    res.status(201).send({"status":"success","body":adduser});
  } catch (e) {
    res.status(500).send({ "status":"false",error: e.message });
  }
};


const Login = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByCredentails(
      req.body.email,
      req.body.password
    );
    if (!user) throw new Error("Invalid Email or Password");
    const token = await user.generateAuthtoken();
    res.status(200).send({ status: "success", "user":user, "token":token });
  } catch (e) {
    res.status(400).send({ status: "false", error: e.message });
  }
};



const userInfos = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

module.exports = {
  signUp,
  Login,
  userInfos
};
