const Weeds = require('../models/weedsModel')

const returnWeeds = async (req, res, next) => {
  const weeds = await Weeds.find()
  console.log(weeds)
  res.send(weeds)
}

module.exports = returnWeeds
