// Create and send token and save it in the cookie.

const sendToken = (user, statusCode, res) => {


    //create jwt token
    const token = user.getJwtToken();

    // Options for cookie 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 
        ),
        //if it is not http only it can be accessed using javascript code. security++
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({ 
        success: true,
        token,
        user
    })
}


module.exports = sendToken;