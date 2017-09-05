import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { SiteService } from './services/site.service';

import { PAGES, ENTITIES } from './utils/constants';

import { User } from './model/user';

declare var $: any;

@Component({
  selector: 'app-root',
  providers: [SiteService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  currentUser: User;
  isLoading: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, 
    private siteService: SiteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.isLogged();
  }

  isLogged() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loadUserData(user.email);
      }
    });
  }

  loadUserData(email: string) {
    this.siteService.retrieve<User>(ENTITIES.user, 'email', email).then(users => {
      this.currentUser = users[0];
      this.initTemplate();
      this.isLoading = false;
    });
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
    this.isLoading = true;
    this.afAuth.auth.signOut()
      .then(() => this.goToLogin());
  }
}
