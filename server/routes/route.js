const app = require('express')();
const data = require('../../booksList')
const cors = require("cors");

const User = require("../models/user-model")

app.get('/books', (req, res) => {
    res.status(200).json(data)
})

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	if (email && password) {
		User.findOne({}, (err, users) => {
			if (users.email === email && users.password === password) {
				res.status(200).send("login success");
			} else {
				res.status(400).send("invalid password or email");
			}
		});
	} else {
		res.status(412).send("email and password are required fields");
	}
})

app.post('/register', (req, res) => {
	const body = req.body;
	if (body.email && body.password) {
		const newUser = {
			email: body.email,
			password: body.password
		};

		User.create(newUser, (err, res) => {
			if (err) console.log(err);
		});
		
		res.status(200).send("user register with success");
	} else {
		res.status(412).send("email and password are required fields");
	}
})

app.get('/cart', (req, res) => {
	res.status(200).send("cart")
	//console.log(res)
})

module.exports = app