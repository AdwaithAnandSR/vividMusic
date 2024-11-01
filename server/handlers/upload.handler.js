const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../keys/serviceKey.js");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   storageBucket: "gs://vividmusic-d6d28.appspot.com"
});
const db = admin.firestore();
const bucket = admin.storage().bucket();

const { getIo } = require("../config/socket.config.js");
const musicModel = require("../models/musics.js");

let handleItemUploadStarted;
let fileUrls = [];
let filesLength = 0;
const io = getIo();

io.on("connection", socket => {
   socket.on("getUploadDets", () => {
      socket.emit("getUploadDetsRes", {
         filesLength,
         uploaded: fileUrls.length
      });
   });

   handleItemUploadStarted = currentFile => {
      socket.emit("itemUpload", {
         currentFile,
         uploaded: fileUrls.length,
         filesLength
      });
   };
});

const handleUpload = async (files, res) => {
   try {
      filesLength = files.length;
      for (const file of files) {
         if (typeof handleItemUploadStarted == "function")
            handleItemUploadStarted(file.originalname);
         const fileName = `songs/${uuidv4()}_${file.originalname}`;
         const fileUpload = bucket.file(fileName);
         await fileUpload.save(file.buffer, {
            metadata: { contentType: file.mimetype }
         });
         const [url] = await fileUpload.getSignedUrl({
            action: "read",
            expires: "03-09-9999"
         });
         fileUrls.push({ url, title: file.originalname });
      }

      console.log(files.length, " items uploaded successfully.");

      for (const file of fileUrls) {
         // Find the index of the last underscore
         const lastUnderscoreIndex = file.title.lastIndexOf("_");

         let formattedTitle;

         if (lastUnderscoreIndex !== -1) {
            // If there's an underscore, remove text after it
            formattedTitle = file.title.substring(0, lastUnderscoreIndex);
         } else {
            // If no underscore, just use the title as is
            formattedTitle = file.title;
         }

         // Replace all remaining underscores with spaces
         formattedTitle = formattedTitle.replace(/_/g, " ");

         await musicModel.create({
            title: formattedTitle,
            url: file.url
         });
      }

      res.status(200).json({
         message: "Songs added successfully",
         fileUrls
      });

      fileUrls = [];
      filesLength = 0;
   } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({
         message: "Failed to add songs",
         error: error.message
      });
   }
};

module.exports = handleUpload;
