import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Utils} from '../../Utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public username: string;
  public logged: boolean;

  constructor(private router: Router) {
    this.username = Utils.get('username');
    this.logged = this.username !== '';
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.username = Utils.get('username');
    this.logged = this.username !== '';
  }

  goToHome(): void {
    this.router.navigate(['home/hospitals']);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  closeSession(): void {
    Utils.deleteAll();
    this.router.navigate(['login']);
  }
}
