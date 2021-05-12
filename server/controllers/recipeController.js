const Recipe = require('../models/recipeModel');


class RecipeService {

	static list() {
		return Recipe.find({})
			.then((recipes) =>{
				return recipes;
			})
	}

	static read(id) {
		return Recipe.findById(id).then((recipe) => {
			return recipe;
		});
	}

	static create(data) {
		const {name, ingredients, steps, timers, imageURL, originalURL} = data;
		const recipe = new Recipe({
			name: name,
			ingredients: ingredients,
			steps: steps,
			timers: timers,
			imageURL: imageURL,
			originalURL: originalURL
		})
		return recipe.save();
	}

	static update(id, data) {
		return Recipe.findById(id).then((recipe) => {
			recipe.set(data);
			return recipe.save();
		});
	}

	static delete(id) {
		return Recipe.findByIdAndDelete(id)
		.then((recipes) => {
			return recipes;
		})
	}

}


module.exports.RecipeService = RecipeService;