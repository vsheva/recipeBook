import {Component} from '@angular/core';
import {NgForm} from '@angular/forms'
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  //styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLogin = true;
  isLoading = false;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(forma: NgForm) {
    if (!forma.valid) {
      return;
    }
    const email = forma.value.email;
    const password = forma.value.password;


    this.isLoading = true;
    if(this.isLogin) {
     //..
    } else {
      this.authService.signup(email, password)
        .subscribe(resData => {
            console.log(resData)
            this.isLoading = false;
          },
          error => {
            console.log(error)
            this.isLoading = false;
          })
    }
    forma.reset();
  }
}
