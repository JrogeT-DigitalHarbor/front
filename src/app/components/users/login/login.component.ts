import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {Utils} from '../../../Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User;
  public errorCode: number;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User('', '', '');
    this.errorCode = 0;
  }

  login(): void {
    this.userService.login(this.user).subscribe(
      (Response) => {
        if (Response.access_token != null) {
          Utils.set('username', this.user.username);
          Utils.set('id', this.user.id);
          this.router.navigate(['home']);
        }
      }, (Error) => {
        if (Error === 'Error: BAD USR') {
          this.errorCode = 1;
        } else if (Error === 'Error: BAD PWD') {
          this.errorCode = 2;
        } else if (Error === 'Error: NOT PWD') {
          this.errorCode = 3;
        }
      }
    );
  }

}
