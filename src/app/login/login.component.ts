import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() { }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        if(result) {
          console.log('login successible');
          this.goToSignUp();
        }
      })
      .catch((error) => console.log(error));
  }

  goToSignUp() {
    this.router.navigate(['signUp']);
  }
}
