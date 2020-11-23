const User = require("../model/user");
const { getHashedPassword } = require("../helper/password");
const { v4: uuidv4 } = require('uuid');

const users = [
    {
        uid: uuidv4(),
        password: getHashedPassword('ram'),
        first_name: 'Ram',
        middle_name: '',
        last_name: 'Thapa',
        email: 'ram@mail.com',
        status: -1
    },
    {
        uid: uuidv4(),
        password: getHashedPassword('shyam'),
        first_name: 'Shyam',
        middle_name: 'Krishna',
        last_name: 'Shrestha',
        email: 'shyam@mail.com',
        status: -1
    },
    {
        uid: uuidv4(),
        password: getHashedPassword('hari'),
        first_name: 'Hari',
        middle_name: '',
        last_name: 'Lamsal',
        email: 'hari@mail.com',
        status: 0
    },
    {
        uid: uuidv4(),
        password: getHashedPassword('sita'),
        first_name: 'Sita',
        middle_name: 'Devi',
        last_name: 'Sharma',
        email: 'sita@mail.com',
        status: 1
    }
];

users.map(user => {
    User.create(user, (err, data) => {
        if (err) {
            console.log(err?.message ?? 'Error');
        } else {
            console.log(data);
        }
    });
});

