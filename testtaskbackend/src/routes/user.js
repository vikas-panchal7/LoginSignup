const express = require("express");
const router = express.Router();
var multer = require("multer");
const { userInfo } = require("os");
const auth = require("../middleware/auth");
const path = require("path");
const {
  signUp,
  Login,
  userInfos
} = require("../controllers/usercontroller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      "avt" + Date.now() + "A" + Math.round(Math.random() * 1000);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpe?g|png|gif|bmp)$/i)) {
    return cb(new Error("please upload Image"));
  }
  cb(undefined, true);
};

const img = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const imges = img.fields([
  { name: "profile", maxCount: 1 },
  { name: "aadhar", maxCount: 1 },
]);
router.post("/users/signUp", imges,signUp);

router.post("/users/login", Login);

router.get("/users/me", auth, userInfos);


module.exports = router;
