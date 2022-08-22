const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WeedsSchema = new Schema({
  weedName: {
    type: String,
    required: true,
  },
  pictureURL: {
    type: String,
    required: true,
  },
  preventable: {
    type: Array,
    required: true,
  },
  killable: {
    type: Array,
    required: true,
  },
  lifetime: {
    type: string,
    required: true,
  },
})

const Weed = mongoose.model('Weed', WeedsSchema)

module.exports = Weed
