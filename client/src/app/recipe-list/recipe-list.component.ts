import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {

	recipeList;

  	constructor(private recipeService : RecipeService) { }

	ngOnInit(): void {
		//const observable = this.recipeService.listRecipe();
		//observable.subscribe((recipe) => {
		//	this.recipeList = recipe;
		//});
		this.updateRecipeList();
	}

	updateRecipeList():void {
		const observable = this.recipeService.listRecipe();
		observable.subscribe((recipe) => {
			this.recipeList = recipe;
		});
	}
}
