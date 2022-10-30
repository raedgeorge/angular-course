import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [

  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {
    path: 'recipes',
    loadChildren: () => import('./recipe/recipes.module').then(mod => mod.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping/shopping-list.module').then(
      mod => mod.ShoppingListModule)
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {path: 'not-found', component: ErrorPageComponent},
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
