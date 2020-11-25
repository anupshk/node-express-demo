const bcrypt = require('bcrypt');

function getHashedPassword(pwd) {
    return bcrypt.hashSync(pwd, 10);
}

function validPassword(plain, hash) {
    return bcrypt.compareSync(plain, hash);
}

module.exports = {
    getHashedPassword,
    validPassword,
}