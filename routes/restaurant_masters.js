var express = require('express');
var fs = require('fs');
var router = express.Router();
// handle multipart form data
const multer = require('multer');
const path = require('path');

const models = require('../models');
const Restaurant = models.Restaurant;

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
	Restaurant.findAll({attributes: ['r_id', 'profile_name','locality_name','area_name','address','payment_mode','city_name','state_name','is_pf','is_ff'],limit: 10})
	.then((restaurants) => {
	  res.render('restaurant/index', {restaurants: restaurants});
	})
});

router.get('/:id/detail', (req, res) => {
	Restaurant.findById(req.params.id)
		.then((restaurant) => {
			res.render('restaurant/show', restaurant.dataValues)
		}).catch((err) => {
			res.render('error', err)
		})
})

router.get('/:id/edit', (req, res) => {
	Restaurant.findById(req.params.id)
		.then((restaurant) => {
			res.render('restaurant/edit', restaurant.dataValues)
		}).catch((err) => {
			res.render('error', err);
		})
})
router.put('/:id/edit',(req, res) => {
	const restaurant = {
		profile_name: req.body.profile_name,
		state_name: req.body.state_name,
		city_name: req.body.city_name,
		area_name: req.body.area_name,
		locality_name: req.body.locality_name
	}
	Restaurant.update(restaurant, {
		where: {
			r_id: req.params.id
		}
	}).then((restaurant) => {
		res.redirect('/restaurants')
	}).catch((err) => {
		res.render('error', err);
	})
})
router.get('/new', (req, res) => {
	console.log('aa')
	res.render('restaurant/create');
})
module.exports = router;
