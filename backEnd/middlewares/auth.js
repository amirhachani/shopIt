
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/user')
const req = require('express/lib/request')
// Checks if user is authenticated or not.


exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const { token } = req.cookies
 
    if(!token){
        return next(new ErrorHandler('Please login to be able to access .', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()
})

// Handling users Roles

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403)
            )}
        next()
    }
}