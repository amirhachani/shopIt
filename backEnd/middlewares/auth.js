// Checks if user is authenticated or not.

const catchAsyncErrors = require('./catchAsyncErrors')

exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const { token } = req.cookies

    console.log(token);
})