import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test recipe', 'This is a test recipe', 'https://www.foodandwine.com/thmb/dX7pNh_WX83ESqb9VJuvkBwVKwM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg'),
    new Recipe('Chicken Pasta', 'This is a Chicken pasta', 'https://skinnyspatula.com/wp-content/uploads/2022/10/Creamy_Garlic_Chicken_Pasta_0-720x720.jpg')
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
