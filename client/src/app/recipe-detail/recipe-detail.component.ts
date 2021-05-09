import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {

  recipeItem;

  constructor(private route: ActivatedRoute, private recipeService : RecipeService, private router: Router) { }

  ngOnInit(): void {
	const recipe_id = this.route.snapshot.paramMap.get('id');
	console.log('recipe_id:', recipe_id);
	const observable = this.recipeService.read(recipe_id);
		observable.subscribe((recipe) => {
			this.recipeItem = recipe;
			console.log(this.recipeItem);
		});
  }

	handleDelete(e) {
		const confirmed = confirm('Are you sure?');
		if(confirmed) {
			const recipe_id = this.recipeItem._id
			const observable = this.recipeService.delete(recipe_id);
			observable.subscribe((result) => {
				console.log("deleted recipe");
				this.router.navigate(['/recipe-list']);
			})
		}
	}
}
