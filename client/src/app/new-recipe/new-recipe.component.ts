import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

 @Output() newRecipe = new EventEmitter();

  recipe:any = {}

  constructor(private recipeService : RecipeService) { }

  ngOnInit(){
  }

	save(newRecipeForm):void {
		 this.recipeService.create(this.recipe).subscribe((recipe) => {
            this.newRecipe.emit();
            newRecipeForm.reset();
   	});

	}

}
