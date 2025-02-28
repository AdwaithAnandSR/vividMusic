const express = require("express");
const router = express.Router();

const musicModel = require("../models/musics.js");
const { signin, signup } = require("../handlers/auth.handler.js");

router.get("/", async (req, res) => {
   res.send('heloo');
});

// authentication routes
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
