import {Injectable} from "@angular/core";
import * as http from "http";
import {HttpClient} from "@angular/common/http";

interface AuthResponse{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}


@Injectable({providedIn:"root"})

export class AuthService{
constructor(private http: HttpClient) {}

 signup(email:string, password:string) {
  return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E", {
     email: email,
     password: password,
     returnSecureToken: true
   })
 }
}

//api key = AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E
