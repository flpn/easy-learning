import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { ENTITIES } from '../utils/constants';

import { BaseService } from './base.service';

import { User } from '../model/user';

@Injectable()
export class SiteService extends BaseService implements OnDestroy {

  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuth) {
    super(af, afAuth);
   }

    getUserData(email: string): Promise<User> {
        // return this.afDatabase.list('users', {
        //     query: {
        //         orderByChild: 'email',
        //         equalTo: email
        //     }
        // })[0];
        return null;
    }
}  