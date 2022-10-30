import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipe/recipe.service";
import {Recipe} from "../recipe/recipe.model";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {UserModel} from "../auth/user.model";

@Injectable({providedIn: "root"})
export class DataStorageService {

  url = 'https://recipe-project-f8846-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  user: UserModel;

  constructor(private http: HttpClient,
              private recipesService:RecipeService,
              private authService: AuthService) {
  }


  storeRecipes(){

    const recipes = this.recipesService.getRecipes();
    this.http.put(this.url, recipes).subscribe(
      (responseData) => {
        console.log(responseData)
      },
      (error) => {
        console.log(error.status);
      }
    );
  }

  fetchRecipes(){

    return this.http.get<Recipe[]>(this.url)
      .pipe(map( recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
