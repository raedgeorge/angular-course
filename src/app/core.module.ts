import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {RecipeService} from "./recipe/recipe.service";
import {ShoppingListService} from "./shopping/shopping-list-edit/shopping-list.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({

  providers: [
    RecipeService,
    ShoppingListService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },

  ]
})
export class CoreModule{}
