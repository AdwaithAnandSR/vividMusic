const express = require("express");
const router = express.Router();

const musicModel = require("../models/musics.js");
const { signin, signup } = require("../handlers/auth.handler.js");

//global routes
router.post("/getGlobalSongs", async (req, res) => {
   try {
      const { limit, page } = req.body;

      const musics = await musicModel
         .find({})
         .sort({ createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit);

      if (musics) return res.status(200).json({ musics });
   } catch (e) {
      console.error(e);
   }
});

router.get("/", async (req, res) => {
   const musics = await musicModel.find({});
   res.send(musics);
});

// authentication routes
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
