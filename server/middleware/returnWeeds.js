const Weeds = require('../models/weedsModel')

const returnWeeds = (req, res, next) => {
  const weeds = Weeds.find()
  res.send(weeds)
}

module.exports = returnWeeds
