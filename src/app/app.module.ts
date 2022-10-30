import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RecipeService} from "./recipe/recipe.service";
import {ShoppingListService} from "./shopping/shopping-list-edit/shopping-list.service";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {AppRoutingModule} from "./app-routes.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";

import {AuthInterceptorService} from "./auth/auth-interceptor.service";

import {RecipesModule} from "./recipe/recipes.module";
import {ShoppingListModule} from "./shopping/shopping-list.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent,
    AuthComponent,
  ],

  imports: [BrowserModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            RecipesModule,
            ShoppingListModule,
            AppRoutingModule,
            SharedModule
  ],

  providers: [RecipeService, ShoppingListService,
              {provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptorService,
              multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
