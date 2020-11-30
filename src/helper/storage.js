var path = require('path');
const storage_dir = path.dirname(__filename) + '/../public/storage/';

function getUserDirectory(user) {
    return storage_dir + user.uid;
}

module.exports = {
    getUserDirectory
}