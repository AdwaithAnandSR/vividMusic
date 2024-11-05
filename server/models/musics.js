const mongoose = require("mongoose");

const schema = mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   url: {
      type: String,
      required: true
   },
   cover: {
      type: String,
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   likes: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true
   }],
   plays: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true
   }]
})

module.exports = mongoose.model('music', schema)