const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bowdlerdev@gmail.com',
    pass: 'akwTWS75',
  },
})

router.post('/submit', (req, res) => {
  const { from, email, rounds, sqFt, yrTotal, trtTotal } = req.body

  const mailOptions = {
    from: 'bowdlerdev@gmail.com',
    to: 'callowaybowdler@gmail.com',
    subject: 'Estimate Submitted',
    text: `${from} has submitted a self-estimate. ${from.firstName}'s estimate was for ${rounds} treatments at ${trtTotal} per treatment and ${yrTotal} per year. ${from.firstName}'s yard totals at ${sqFt} square feet. You can contact them further at ${email}.`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).json({ message: error.message })
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  res.status(200).json({ message: `Email sent to ${from} at ${email}` })
})

module.exports = router
