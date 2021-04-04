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
        Utils.log(Response);
        if (Response.body === 1) {
          this.errorCode = 1;
        } else if (Response.body === 2) {
          this.errorCode = 2;
        } else {
          Utils.set('username', this.user.username);
          Utils.set('id', Response.body.id);
          this.router.navigate(['home']);
        }
      }, (Error) => {
        alert('Error');
      }
    );
  }

}
