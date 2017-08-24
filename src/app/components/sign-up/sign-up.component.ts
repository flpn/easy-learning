import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../../model/user';

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
    this.afAuth.auth.createUserWithEmailAndPassword(this.newUser.email, this.password)
      .then(result => {
        if(result) {
          console.log(result);
          this.newUser.uid = result.uid;
          this.pushUser();
          this.goToHome();
        }
      })
      .catch(error => {
        console.log('sign up error' + error);
      });
  }

  pushUser() {
    this.afDatabase.list('users').push(this.newUser);
  }

  passwordMatch() {
    return this.password && this.confirmPassword &&
           this.password === this.confirmPassword &&
            this.confirmPassword.length > 0;
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
