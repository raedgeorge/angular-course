import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping/shopping-list-edit/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shopListService: ShoppingListService) {
  }

  // private recipes: Recipe[] = [
  //   new Recipe('Hamburger',
  //     '../../../assets/images/hamburger.png',
  //     'double cheese chicken hamburger with onions',
  //     // 'https://www.thespruceeats.com/thmb/WM5r2QFG0KTaaOdKipXmmTnU2xc=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/slow-cooker-hamburgers-recipe-for-kids-2098104-hero-01-3dd9bf2b2ca748358047f2ff4e73b64c.jpg'
  //     [
  //       new Ingredient('meat', 1),
  //       new Ingredient('french fries', 100)
  //     ]
  //   )
  //   ,
  //   new Recipe('Pizza',
  //     '../../../assets/images/pizza.jpg',
  //     'chicken pizza with all toppings',
  //     // 'https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401'
  //     [
  //       new Ingredient('tomato', 4),
  //       new Ingredient('salami', 10)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.shopListService.addIngredients(ingredients);
  }

  getRecipeById(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipeById(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
