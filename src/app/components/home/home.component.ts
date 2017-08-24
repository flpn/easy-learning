import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.notLogged();
  }

  notLogged() {
    this.afAuth.authState.subscribe(user => {
      if(!user) {
        this.goToLogin();
      }
    });
  } 

  goToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.goToLogin());
  }
}
