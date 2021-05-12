const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const recipe = require('../models/recipeModel');
const app = express();
const multer = require('multer');
const mime = require('mime');
const recipe_list_DATA = fs.readFileSync(path.join(__dirname, '../data/recipe.json'), 'utf-8'); 
const recipe_list = JSON.parse(recipe_list_DATA);

//CRUD

// save data from ../data/recipe.json
var saves = recipe_list.map((r, i)=>{
      	return new recipe(r).save((err, savedR)=>{
			if(err) {
				console.log(err);
			}
          console.log(`saved from recipes.js ${i}`);
      });
});


// Read - view all data from database
router.get('/', (req, res, next) => {
	recipe.find({})
	.then((recipes)=>{
		res.render('recipes', {
			recipes: recipes
		});
	})
	.catch((err)=> {
		if(err) {
			res.end("ERROR!");
		}
	});
});


// create a new recipe 
router.post('/', (req, res, next) => {
	var Recipe = new recipe({
		name: req.body.name,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		timers: req.body.timers,
		imageURL: req.body.imageURL
	});

	Recipe.save() // save to the MongoDB 
	.then(()=>{
		res.redirect('/recipes'); // recipe saved successfully then back to the recipes page
	})
	.catch((err)=>{
		if(err) {
			console.log(err);
			throw new Error('recipeSaveError', Recipe);
		}
	})
});

// Delete a recipe
router.get('/delete/:id', (req, res, next) => {
	var recipe_id = req.params.id;
	recipe.findByIdAndDelete(recipe_id, (err, recipe)=>{
		console.log("Deleted a recipe", recipe_id);
		res.render('delete' );
	});
});

// Update a recipe
router.get('/update/:id', (req, res, next) => {
	var recipe_id = req.params.id;
	recipe.findOneAndUpdate({recipe_id})
	.then((recipe) =>{
		res.render('update', {
			recipe: recipe,
		});
	})
	.catch((err) =>{
		if(err){
			console.log(err);
		}
	})
});

router.post('/update/:id', (req, res, next) =>{
	var newRecipe = {
		name: req.body.name,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
	}
	recipe.findByIdAndUpdate(req.params.id, newRecipe)
	.then((recipe) =>{
		res.render('update', {
			recipe: recipe,
		});
	})
	.catch((err) =>{
		if(err){
			console.log(err);
		}
	})
});


module.exports = router;