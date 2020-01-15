const express = require('express');
const createToken = require('../config/auth').createToken;
const { pool } = require('../config/db');

const router = express.Router();


const getUsers = (email, password) => {
    return pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
        .then(response => response.rows);
}

router.post('/token', (request, response) => {
        const email = request.body.email;
        const password = request.body.password;

        getUsers(email, password)
            .then((users) => {
              if (users.length === 1) {
                 const token = createToken({
                    id: users.id
                });
                response.send({
                    token
                });
              } else {
                response.status(400).send({
                    error: "Invalid username/password"
                });
            }    
            })
            .catch((error) => {
                throw new Error('error');
            });
});

module.exports = router;