const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WeedsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pictureURL: {
    type: String,
    required: true,
  },
  preventable: {
    type: Object,
    required: true,
  },
  killable: {
    type: Object,
    required: true,
  },
  lifetime: {
    type: String,
    required: true,
  },
})

const Weed = mongoose.model('Weed', WeedsSchema)

module.exports = Weed
