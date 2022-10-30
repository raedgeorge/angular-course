import {Ingredient} from "../../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{

  changedIngredients = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('tomatoes', 5),
    new Ingredient('cheese', 10)
  ];

  getIngredients(){
   return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.changedIngredients.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){

    // option 1
    // for (let i = 0; i < ingredients.length; i++){
    //   this.addIngredient((ingredients[i]));
    // }

    // option2 using ES6 feature
    this.ingredients.push(...ingredients);
    this.changedIngredients.next(this.ingredients.slice());
  }

  getIngredientById(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateItem(newIngredient: Ingredient, index: number) {
      this.ingredients[index] = newIngredient;
      this.changedIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.changedIngredients.next(this.ingredients.slice());
  }
}
