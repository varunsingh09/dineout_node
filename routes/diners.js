var express = require('express');
var fs = require('fs');
var router = express.Router();
// handle multipart form data
const multer = require('multer');
const path = require('path');

const models = require('../models');
const Diner = models.Diner;

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
	Diner.findById(req.params.d_id)
		.then((diner) => {
			res.render('diner/edit', diner.dataValues)
		}).catch((err) => {
			res.render('error', err);
		})
})
module.exports = router;
