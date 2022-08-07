const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Object, // More specific in the Schema?
    required: true,
  },
})

//photo
//roles
// put estimates here? or in separate collection?

const User = mongoose.model('User', UserSchema)

module.exports = User
