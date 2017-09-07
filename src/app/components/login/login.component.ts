import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';


import { User } from '../../model/user';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
    this.user = new User;
   }

  ngOnInit() {
    this.isLogged();
   }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        if(result) {
          this.goToSignUp();
        }
      })
      .catch((error) => this.toastMessage('Email e/ou senha inválidos'));     
  }

  isLogged() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.goToHome();
      }
    });
  } 

  toastMessage(message: String) {
    Materialize.toast(message, 3000, 'rounded');
  }

  goToSignUp() {
    this.router.navigate(['signUp']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  loginFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()) 
        .then(res => {
            this.user.name = res.user.displayName;
            this.user.email = res.user.email;
            this.user.profileImage = res.user.photoURL;
            this.user.uid = res.user.uid;
            this.afDatabase.list('users').push(this.user);
        });
  }

  logoutFacebook(){
    this.afAuth.auth.signOut()
  }
}
