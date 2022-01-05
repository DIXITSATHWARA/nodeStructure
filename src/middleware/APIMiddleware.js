const jwt = require("jsonwebtoken")

const APIMiddleware = (req, res, next) => {

    try {
        if (req.cookies['access_token'] || req.headers['access_token']) {

            let _token = req.cookies['access_token'] || req.headers['access_token']
            console.log(_token);
            jwt.verify(_token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {

                    console.log(err);
                    return res.json({
                        code: 0,
                        error: err
                    })
                } else if (decode) {
                    req.user = decode
                    next()
                }
            })
        } else {
            return res.json({
                code: 0,
                error: "Please login again."
            })
        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 0,
            error: err
        })
    }
}

module.exports = APIMiddleware