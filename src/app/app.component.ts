import {Component, OnInit} from '@angular/core';

//import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AuthService} from "./auth/auth.service";
import {LoggingService} from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private loggingService: LoggingService) {}


  ngOnInit() {
this.authService.autologin();
    this.loggingService.printLog("Hello from Angular AppComp.")
}

}
