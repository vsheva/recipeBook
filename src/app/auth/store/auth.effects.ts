import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {AuthResponseData} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIkey, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          //const expirationDuration = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return of(new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: expirationDate
          }));
        }),

        catchError((error) => {
          //...
          return of();
        }),);
    }),
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }
}
