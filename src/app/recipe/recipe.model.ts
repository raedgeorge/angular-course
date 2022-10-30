import {Ingredient} from "../shared/ingredient.model";

export class Recipe {

  public name: string;
  public imagePath: string;
  public description: string;
  public ingredients: Ingredient[];

  constructor(name: string,
              imagePath: string,
              description: string,
              ingredients: Ingredient[]) {

    this.name = name;
    this.imagePath = imagePath;
    this.description = description;
    this.ingredients = ingredients;
  }
}
