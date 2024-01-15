import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthResponse{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?: boolean
}


@Injectable({providedIn:"root"})

export class AuthService {
  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError((errorRes) => {  //move logic form auth.component.ts to this observable (в пайп мы чуть подстраиваем данные)

      //unknown error vs. EMAIL_EXISTS error
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);//!!
      }

      switch (errorRes.error.error.message) {
        case "EMAIL_EXISTS":
          errorMessage = 'This email already exists';
      }
      return throwError(errorMessage)
      //!!
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E", {
      email: email,
      password: password,
      returnSecureToken: true
    })


  }
}

//api key = AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E
