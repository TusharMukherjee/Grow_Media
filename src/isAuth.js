const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (context) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization){
        throw new Error("not authorized");
    }
    try {
        const token = authorization.split(" ")[1];
        const validateVar = jwt.verify(token, process.env.VERIFICATIONTOKEN);
        return validateVar;
    }
    catch(err) {
        console.log(err);
    }
}

exports = isAuth;