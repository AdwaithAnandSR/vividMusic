const NodeID3 = require("node-id3");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../keys/serviceKey.js");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   storageBucket: "gs://vividmusic-d6d28.appspot.com"
});
const bucket = admin.storage().bucket();

const { getIo } = require("../config/socket.config.js");
const musicModel = require("../models/musics.js");

let handleItemUploadStarted;
let filesLength = 0,
   currentLength = 0;
const io = getIo();

io.on("connection", socket => {
   socket.on("getUploadDets", () => {
      socket.emit("getUploadDetsRes", {
         filesLength,
         uploaded: currentLength
      });
   });

   handleItemUploadStarted = currentFile => {
      socket.emit("itemUpload", {
         currentFile,
         uploaded: currentLength,
         filesLength
      });
   };
});

const handleUpload = async (files, res) => {
   try {
      filesLength = files.length;
      currentLength = filesLength;

      for (const file of files) {
         if (typeof handleItemUploadStarted == "function")
            handleItemUploadStarted(file.originalname);

         const tags = NodeID3.read(file.buffer);

         const fileName = `songs/${uuidv4()}_${file.originalname}`;
         const fileUpload = bucket.file(fileName);

         await fileUpload.save(file.buffer, {
            metadata: { contentType: file.mimetype }
         });

         const [url] = await fileUpload.getSignedUrl({
            action: "read",
            expires: "03-09-9999"
         });

         if (tags?.image?.imageBuffer) {
            const imageName = `covers/${uuidv4()}_${file.originalname}`;
            const imageUpload = bucket.file(imageName);

            // Upload the image file
            await imageUpload.save(tags.image.imageBuffer, {
               metadata: { contentType: tags.image.mime }
            });

            const [imageUrl] = await imageUpload.getSignedUrl({
               action: "read",
               expires: "03-09-9999"
            });

            dets = {
               cover: imageUrl,
               url,
               title: tags.title
            };
            await musicModel.create(dets);
         }
         currentLength--;
      }

      res.status(200).json({
         message: "Songs added successfully"
      });

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
