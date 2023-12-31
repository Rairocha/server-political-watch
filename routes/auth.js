var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isLoggedIn = require("../middleware/isLoggedIn");

const User = require("../models/User");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, fullName, username  } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Use regex to validate the password format
  // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!passwordRegex.test(password)) {
  //   res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
  //   return;
  // }


  User.findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ email, password: hashedPassword, fullName, username , following:[] })
        .then((createdUser) => {

          const { email, _id, fullName, username,follolwing  } = createdUser;

          const payload = { email, _id, fullName,  username };

          const authToken = jwt.sign(payload, process.env.SECRET, {
            algorithm: "HS256",
            expiresIn: "6h",
          });
  
          res.status(200).json({ authToken });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error 1" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error 2" });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {

        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {

        const { email, _id, fullName, username} = foundUser;

        const payload = { email, _id, fullName, username };

        const authToken = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isLoggedIn, (req, res, next) => {

  res.status(200).json(req.user);
});

module.exports = router;