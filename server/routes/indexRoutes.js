const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for quick uploads
const upload = multer({ storage });

const musicModel = require("../models/musics.js");
const handleUpload = require("../handlers/upload.handler.js");
const { signin, signup } = require("../handlers/auth.handler.js");

//global routes
router.post("/getGlobalSongs", async (req, res) => {
   try {
      const { limit, page } = req.body;

      const musics = await musicModel
         .find({})
         .skip((page - 1) * limit) 
         .limit(limit); 

      if (musics) return res.status(200).json({ musics });
   } catch (e) {
      console.error(e);
   }
});

//admin routes
router.post("/addSongs", upload.array("audioFiles"), async (req, res) => {
   const files = req.files;
   if (!files || files.length === 0) {
      return res.status(400).json({
         message: "at least one audio file are required"
      });
   }
   handleUpload(files, res);
});

// authentication routes
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
