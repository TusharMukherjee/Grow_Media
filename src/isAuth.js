const jwt = require('jsonwebtoken');

const isAuth = (context) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization){
        throw new Error("not authorized");
    }
    try {
        const token = authorization.split(" ")[1];
        const validateVar = jwt.verify(token, `tKBw+m]$#VC"&P3_Lq:u`);
        return validateVar;
    }
    catch(err) {
        console.log(err);
    }
}

exports = isAuth;