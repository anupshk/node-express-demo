const bcrypt = require('bcrypt');

function getHashedPassword(pwd) {
    return bcrypt.hashSync(pwd, 10);
}

function validPassword(plain, hash) {
    try {
        return bcrypt.compareSync(plain, hash);
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    getHashedPassword,
    validPassword,
}