const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
   res.status(200).json("Welcome, your app is working well");
});


module.exports = router;