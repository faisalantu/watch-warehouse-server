const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")


router.get("/", async (req, res) => {
  try {
    

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, masssage: "no products" });
  }
});


// @route   POST api/auth
// @desc    create jwt token
// @access  nun
router.post("/signin", async (req, res) => {
  const user = req.body;
  const accessToken = jwt.sign(user, process.env.JWT_TOKEN,{
    expiresIn: '1d',
  })
  res.send(accessToken)
});



module.exports = router;
