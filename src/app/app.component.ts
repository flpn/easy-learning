import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { PAGES } from './utils/constants';

import { User } from './model/user';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  ngOnInit() {
    this.isLogged();
    this.initTemplate();
  }

  isLogged() {
    console.log(this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loadUserData();
      }
    }));
  }

  loadUserData() {

  }

  initTemplate() {
    this.initScreen();
    this.initTemplateTooltip();
  }

  initScreen() {
      $('.button-collapse').sideNav();
  }

  initTemplateTooltip() {
      $('.tooltips').tooltip();
  }
  
  closeNav() {
      $('.button-collapse').sideNav('hide');
    }

  isNoAuthorizedPage() {
    return [PAGES.login, PAGES.signUp].some(page => page === this.router.url);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.goToLogin());
  }
}
