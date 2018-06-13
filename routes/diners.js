var express = require('express');
var fs = require('fs');
var router = express.Router();
// handle multipart form data
const multer = require('multer');
const path = require('path');

const models = require('../models');
const Diner = models.Diner;
const Image = models.Image;

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
router.get('/:d_id/edit', (req, res) => {
	Diner.findById(req.params.d_id)
		.then((diner) => {
			res.render('diner/edit', diner.dataValues)
		}).catch((err) => {
			res.render('error', err);
		})
})

router.post('/', upload.single('photo'), (req, res) => {
	Diner.create({
		d_first_name: req.body.firstname,
		d_last_name: req.body.lastname,
		d_email: req.body.email,
		d_phone: req.body.phone,
		photo: !req.file ? 'placeholder.jpg' : req.file.filename
	}).then((user) => {
		res.redirect('/diners')
	}).catch((err) => {
		res.render('error', err);
	})
})

router.put('/:id/edit', upload.single('photo'), (req, res) => {
	const diner = {
		d_first_name: req.body.firstname,
		d_last_name: req.body.lastname,
		d_email: req.body.email
	}
	// if user upload new photo, then remove old photo and save photo's name in database
	if (req.file) {
		// if old photo exists (old photo not empty) then unlink / remove the photo in directory
		if (req.body.old_photo !== '')
			fs.unlink(`uploads/photo/${req.body.old_photo}`);
		diner.photo = req.file.filename
	}
	Diner.update(diner, {
		where: {
			d_id: req.params.id
		}
	}).then((diner) => {
		res.redirect('/diners')
	}).catch((err) => {
		res.render('error', err);
	})
})

router.get('/new', (req, res) => {
	console.log('aa')
	res.render('diner/create');
})


router.get('/:id/delete', (req, res) => {console.log(req.params.id)
	Diner.findById(req.params.id)
		.then((diner) => {
				Diner.destroy({
					where: {
						d_id: req.params.id
					}
				}).then(() => {
					res.redirect('/diners')
				}).catch((err) => {
					res.render('error', err)
				})
		}).catch((err) => {
			res.render('error', err)
		})
})

module.exports = router;
