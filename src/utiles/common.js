const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @description This function is to encypt user password.
 * @param password
 */
async function encryptPassword(password) {
    try{
        const hash = await bcrypt.genSalt(saltRounds);
        const encryptText = await bcrypt.hash(password, hash);
        return encryptText
    } catch (error) {
        console.log(error)
    }
}

/**
 * @description This function is to verify user password.
 * @param password
 */
async function checkPassword(password, db_password) {
    try{
        let valid = await bcrypt.compare(password, db_password);
        return valid
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    encryptPassword,
    checkPassword
}
