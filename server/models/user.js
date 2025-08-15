
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true , 
        unique : 'true'
    },
     email : {
        type : String,
        required : true , 
        unique : 'true'
    }, password : {
        type : String,
        required : true , 
    },
      role: {
    type: String,
    default: 'user',  // this will set 'user' as default when no role is provided
  },

})

const User = mongoose.model('User',userSchema)
module.exports =User