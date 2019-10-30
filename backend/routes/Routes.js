const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const date = new Date();
    const userData = {
        name: name,
        email: email,
        password: password,
        created: date
    }
    if(name && email && password && date) {
        console.log(userData);
        User.findOne({
            email
        })
        .then(email => {
            if(email) {
                res.json({ error:"email dah ada bos!" })
            }
            else {
                User.create(userData)
                .then(response => {
                    res.json({ msg: 'register success', data: response })
                })
                .catch(error => {
                    res.json({ msg: 'register failed' + error })
                })
            }
        })
        .catch(error => {
            res.json({ msg: "error bos" })
        })
    } 
    else {
        res.json({ error: "field tidak boleh kosong" })
    }
    
})

users.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        User.findOne({
            email
        })
        .then(user => {
            if (user.password === password) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ msg: "login berhasil", payload: payload, token: token })
            } else {
                res.json({ error: "Email dan password gak pas" })
            }
        })
        .catch(err => {
            res.json({ error: "Email tidak ditemukan" })
        })
    }
    else {
        res.json({ error: "Field tidak boleh kosong" })
    }
})

module.exports = users

