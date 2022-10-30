import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.userSubject.pipe(take(1), exhaustMap( authUser => {

      if (!authUser){
        return next.handle(req);
      }

      const modifiedRequest = req.clone({
        params: new HttpParams().set('auth', authUser.token),
      });

       return next.handle(modifiedRequest);
    }))
  }
}
