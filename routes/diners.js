var express = require('express');
var fs = require('fs');
var router = express.Router();
// handle multipart form data
const multer = require('multer');
const path = require('path');

const models = require('../models');
const Diner = models.Diner;


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// set uploads directory
		cb(null, 'uploads/photo/')
	},
	filename: (req, file, cb) => {
		// save file with current timestamp + user email + file extension
		cb(null, Date.now() + path.extname(file.originalname));
	}
})
const upload = multer({storage: storage});


/* GET users listing. */
router.get('/', function(req, res, next) {
	Diner.findAll({attributes: ['d_id','d_first_name','d_last_name','d_phone','d_email','d_dt'],limit: 10})
	.then((diner) => {
	  res.render('diner/index', {diners: diner});
	})
});

router.get('/:id/detail', (req, res) => {
	Diner.findById(req.params.id) .then((diner) => {
			res.render('diner/show', diner.dataValues)
		}).catch((err) => {
			res.render('error', err)
		})
})
router.get('/:id/edit', (req, res) => {
	Diner.findById(req.params.id)
		.then((diner) => {
			res.render('diner/edit', diner.dataValues)
		}).catch((err) => {
			res.render('error', err);
		})
})

router.post('/', upload.single('photo'), (req, res) => {
	User.create({
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		email: req.body.email,
		photo: !req.file ? 'placeholder.jpg' : req.file.filename
	}).then((user) => {
		res.redirect('/diners')
	}).catch((err) => {
		res.render('error', err);
	})
})


module.exports = router;
