import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
                      private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {

    return this.authService.userSubject.pipe(
      take(1),
      map(authUser => {
        const isAuthUser = !!authUser;
          if (isAuthUser) {
            return true;
        }
          return this.router.createUrlTree(['/auth']);
      })
    )

  }
}
