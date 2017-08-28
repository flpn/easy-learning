import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-home',
  providers: [SiteService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private siteService: SiteService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.siteService.notLogged();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.goToLogin());
  }
}
