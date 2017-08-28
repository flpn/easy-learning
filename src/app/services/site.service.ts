import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { ENTITIES, PAGES } from '../utils/constants';

import { BaseService } from './base.service';

import { User } from '../model/user';
import { Question } from '../model/question';

@Injectable()
export class SiteService extends BaseService implements OnDestroy {

  constructor(private router: Router, private af: AngularFireDatabase, private afAuth: AngularFireAuth) {
    super(af, afAuth);
   }

   createQuestion(question: Question) {
     return this.insert<Question>(ENTITIES.question, question)
   }

   notLogged() {
    this.afAuth.authState.subscribe(user => {
      if(!user) {
        this.router.navigate([PAGES.login]);
      }
    }) 
   }
}  