const express = require('express');
const router = express.Router();
const multer = require('multer');
const recipeController = require('../controllers/recipeController');
const imageModel = require('../models/imageModel');
const recipeService = recipeController.RecipeService;


router.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	});

	if(req.method == 'OPTIONS') {
		return res.status(200).end();
	}
	next();
});

//create
router.post('/', async (req, res, next) =>{
	var recipe = {
		name: req.body.name,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		timers: req.body.timers,
		imageURL: req.body.imageURL
	};

    var saved_recipe;
	try {
		saved_recipe = await recipeService.create(recipe);
		res.status(201);
		res.json(saved_recipe);
	} catch(err) {
		console.log(err);
		next(new Error('Error saving recipe'));
	}
});

//read 
router.get('/', (req, res, next)=>{
	recipeService.list()
	.then((recipes) =>{
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(recipes));
	})
	
});

router.get('/:id', async (req, res, next) =>{
	const recipe_id = req.params.id;
	var recipe;
	try {
		recipe = await recipeService.read(recipe_id);
	} catch(err) {
		next(new Error(`Error updating recipe ${recipe_id}`));
	}
	res.status(200);
	res.json(recipe);
})

//update
router.put('/:id', async (req, res, next)=>{
	const recipe_id = req.params.id;
	const data = req.body;
	try {
		recipe = await recipeService.update(recipe_id, data)
	} catch(err) {
		next(new Error(`Error updating recipe ${recipe_id}`));
	}
	res.status(200);
	res.json(recipe);
});

//delete
router.delete('/:id', async (req, res, next)=>{
	const recipe_id = req.params.id;
	try {
		await recipeService.delete(recipe_id);
		res.status(200);
		res.send(JSON.stringify(recipe_id));
	} catch(err) {
		console.log(err);
		next(new Error(`Error deleting recipe ${recipe_id}`));
		res.status(404);
		res.json(recipe_id);
	}
});





module.exports = router;
