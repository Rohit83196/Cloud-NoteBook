const jwt = require('jsonwebtoken');
const JWT_SECRET = "rohitistoxicin$ature"; 
// get the user from jwt token and add id to the req body
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send("please authenticate with a valid auth-token")
    }
    try {
        const data = jwt.verify(token , JWT_SECRET )
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send("try-catch auth-token error")
        
    }
}


module.exports = fetchuser;