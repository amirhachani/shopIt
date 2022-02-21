const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name can not exceed 30 characters']

    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be at least 6 characters'],
        select: false // whenever displaying the user do not display the password
    }, 
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


// compare user password 
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JSON WEB TOKEN  
userSchema.methods.getJwtToken = function (){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


// Encrypt Password before saving 
// Not using Arrow function because this keyword is undefined !!!!!!!!!! 

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
}) 

module.exports = mongoose.model('User', userSchema)