const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../../models/user.model");
const stripe = require("stripe")("sk_test_YB3qVztlhzBJspC1eihOnsxB");
router.post("/", async (req, res) => {
  console.log(req.body);
  const clientToken = req.cookies.jwt;
  let UserID = undefined;

  try {
    UserID = await jwt.verify(clientToken, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
  }

  if (UserID) {
    User.findById(UserID.id, async (err, dbUser) => {
      if (err) {
        console.log(err);
        let response = {
          message: "Something went wrong",
          user: undefined
        };
        res.json(response);
      } else if (dbUser) {
        let activeC = undefined;
        if (req.body.price == 9) {
          activeC = 10;
        } else if (req.body.price == 19) {
          activeC = 20;
        }
        User.findByIdAndUpdate(dbUser._id, {
          purchasedOn: Date.now(),
          subscribed: true,
          activeCredits: activeC
        }).then(async doc => {
          const customer = await stripe.customers.create({
            email: req.body.tken.email,
            source: req.body.token.id
          });
          const charge = await stripe.charges.create({
            amount: eq.body.price * 100,
            currency: "usd",
            customer: customer.id,
            rexiept_email: req.body.token.email
          });
          let response = {
            message: "success",
            user: doc
          };
          res.json(response);
        });
      }
    });
  }
});

module.exports = router;
