import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {NgModule} from "@angular/core";

import {AuthComponent} from "./auth/auth.component";

const appRoutes: Routes = [

  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'auth', component: AuthComponent},
  {path: 'not-found', component: ErrorPageComponent},
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
