const db = require("./db");

// constructor
const User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.first_name = user.first_name;
    this.middle_name = user.middle_name;
    this.last_name = user.last_name;
    this.status = user.status;
};

User.create = (user, result) => {
    db.query("INSERT INTO users SET ?", user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
    });
};

User.findById = (UserId, result) => {
    db.query(`SELECT id,email,first_name,middle_name,last_name FROM users WHERE id = ${UserId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.findByEmail = (email, result) => {
    db.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    db.query("SELECT id,email,first_name,middle_name,last_name FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.updateById = (id, User, result) => {
    db.query(
        "UPDATE users SET first_name = ?, middle_name = ?, last_name = ?, status = ? WHERE id = ?",
        [User.first_name, User.middle_name, User.last_name, User.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated User: ", { id: id, ...User });
            result(null, { id: id, ...User });
        }
    );
};

User.remove = (id, result) => {
    db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted User with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    db.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Users`);
        result(null, res);
    });
};

module.exports = User;