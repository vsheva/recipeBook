import { Component } from '@angular/core';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  //styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLogin = true

  onSwitchMode() {
    this.isLogin= !this.isLogin
  }

  onSubmit(forma: NgForm) {
    console.log(forma.value);
    forma.reset();
  }

}
