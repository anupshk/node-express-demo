const bcrypt = require('bcrypt');

function getHashedPassword(pwd) {
    return bcrypt.hashSync(pwd, 10);
}

module.exports = {
    getHashedPassword
}