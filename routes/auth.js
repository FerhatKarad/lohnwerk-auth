const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.js')

const saltRounds = 10

router.post('/signup', (req, res, next) => {
	const { email, password, name } = req.body;
	if (email === '' || password === '' || name === '') {
		res.status(400).json({ message: "Provide email, password and name" });
		return;
	}
	const emailValid = email.includes('@')
	if (!emailValid) {
		res.status(400).json({ message: 'Provide a valid email address.' });
		return;
	}

	if (password.length < 4) {
		res.status(400).json({ message: 'Password must have at least 4 characters and contain at least one number, one lowercase and one uppercase letter.' });
		return;
	}

	User.findOne({ email })
		.then((foundUser) => {
			if (foundUser) {
				res.status(400).json({ message: "User already exists." });
				return;
			}

			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);

			return User.create({ email, password: hashedPassword, name });
		})
		.then((createdUser) => {
			const { email, name, _id } = createdUser;

			const user = { email, name, _id };

			res.status(201).json({ user: user });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "Internal Server Error" })
		});
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body

	if (email === '' || password === '') {
		res.status(400).json({ message: "Provide email and password" });
		return;
	}

	User.findOne({ email })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: "User not found" });
				return;
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { _id, email, name } = foundUser
				const payload = { _id, email, name }

				const authToken = jwt.sign(
					payload,
					process.env.TOKEN_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken: authToken })
			}
			else {
				res.status(401).json({ message: "Unable to authenticate user" });

			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "Internal Server Error" })
		})
});

router.get('/user', (req, res, next) => {
	const {_id} = req.body
	
	console.log(req.body)
	
	User.find()
	  .then((response) => {
		res.status(200).json({ pokemoresponsens })
	  })
	  
	  .catch(err => res.status(400).json(err))
  })

router.get('/verify', isAuthenticated, (req, res, next) => {
	console.log('request payload: ', req.payload)
	res.status(200).json(req.payload)
});


module.exports = router;