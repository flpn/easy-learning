import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ENTITIES } from '../../utils/constants';

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

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  ngOnInit() {
    this.isLogged();
   }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        if(result) {
          this.goToHome();
        }
      })
      .catch((error) => this.toastMessage('Email e/ou senha inválidos'));     
  }

  loginWithFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(result => {
      if(result) {
        this.verifyUser(result.user);
      }
    })
    .catch((error) => this.toastMessage('Um erro ocorreu, tente novamente')); 
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if(result) {
          this.verifyUser(result.user);
        }
      })
      .catch((error) => this.toastMessage('Um erro ocorreu, tente novamente'));     
      
  }
  
  verifyUser(user: any) {
    this.afDatabase.list(ENTITIES.user, {
      query: {
        orderByChild: 'email',
        equalTo: user.email
      }
    })
    .subscribe(list => {
      if (list.length === 0) 
        this.pushUser(user);
      
      this.goToHome();      
    });
  }

  pushUser(user: any) {
    this.afDatabase.list(ENTITIES.user)
      .push(this.getUserInfo(user));
  }

  getUserInfo(user: any) {
    let newUser = new User();
    newUser.email = user.email;
    newUser.profileImage = user.photoURL;
    newUser.email = user.email;
    newUser.uid = user.uid;
    newUser.name = user.displayName.split(' ')[0];
    newUser.lastname = user.displayName.split(' ')[1];

    return newUser;
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
}
