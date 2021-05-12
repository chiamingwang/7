import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  @Output() newRecipe = new EventEmitter();

  recipe:any = {};

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }

	save(newRecipeForm):void {
		let formData = new FormData();
		formData.append('name', this.recipe.name );
		formData.append('ingredients', this.recipe.ingredients);
		formData.append('steps', this.recipe.steps);
		formData.append('timers', this.recipe.timers);
		formData.append('imageURL', this.recipe.imageURL);
		this.recipeService.create(formData)
			.subscribe((recipe) => {
			this.newRecipe.emit();
			newRecipeForm.reset();
   	});

	}

}
