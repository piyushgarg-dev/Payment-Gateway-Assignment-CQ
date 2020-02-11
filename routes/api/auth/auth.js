const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const bcryptjs = require("bcryptjs");
// Models
const User = require("../../../models/user.model");

// @Route: /api/auth

// @ Route: /api/auth/user
// @Method: GET
// @Desc: Returns JSON object of current User
router.get("/user", (req, res) => {
  let user = undefined;
  let userID = undefined;
  if (req.cookies.jwt) {
    //   JWT exsists
    const clientJWT = req.cookies.jwt;
    try {
      userID = jwt.verify(clientJWT, process.env.JWT_SECRET);
    } catch (e) {
      console.log(chalk.bgRedBright.black(e));
    }
    if (userID) {
      // Find User From MONGODB
      User.findById(userID, (err, dbUser) => {
        if (err) {
          console.log(chalk.bgRedBright.black(err));
          res.json({ user: user });
        } else {
          res.json({ user: dbUser });
        }
      });
    }
  } else {
    res.json({ user: user });
  }
});

// @ Route: /api/auth/login
// @Method: POST
// @Desc: Checks User in DB and Sets Cookie [JWT]
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    User.findOne(email, async (err, dbUser) => {
      if (err) {
        let response = {
          message: "Something went wrong",
          user: undefined
        };
        res.status(400).json(response);
      } else if (dbUser) {
        let dbUserPassword = dbUser.password;
        let match = await bcryptjs.compareSync(password, dbUserPassword);
        if (match) {
          let response = {
            message: "success",
            user: dbUser
          };
          res.status(200).json(response);
        } else {
          let response = {
            message: "Incorrect Password",
            user: undefined
          };
          res.status(400).json(response);
        }
      } else if (!dbUser) {
        let response = {
          message: "User Not Found",
          user: undefined
        };
        res.status(400).json(response);
      }
    });
  }
});

module.exports = router;
