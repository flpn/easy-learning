import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../../model/user';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser: User;

  password: string;
  confirmPassword: string;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { 
    this.newUser = new User();
  }

  ngOnInit() {
    this.isLogged();
   }

  signUp() {
    if(this.passwordMatch()) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.newUser.email, this.password)
        .then(result => {
          if(result) {
            this.newUser.uid = result.uid;
            this.pushUser();
            this.goToHome();
          }
        })
        .catch(error => {
          this.toastMessage('Um erro ocorreu, tente novamente');
        });
      }
      else {
        this.toastMessage('Senha e confirmação de senha devem ser iguais');
        this.resetPasswordFields();
      }
  }

  pushUser() {
    this.afDatabase.list('users').push(this.newUser);
  }

  passwordMatch() {
    return this.password === this.confirmPassword;
  }

  toastMessage(message: String) {
    Materialize.toast(message, 3000, 'rounded');
  }

  resetPasswordFields() {
      this.password = '';
      this.confirmPassword = '';
  }

  isLogged() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.goToHome();
      }
    });
  } 

  goToHome() {
    this.router.navigate(['home']);
  }
}
