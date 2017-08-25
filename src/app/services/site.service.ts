import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { ENTITIES } from '../utils/constants';

import { BaseService } from './base.service';

@Injectable()
export class SiteService extends BaseService implements OnDestroy{

    constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
        super(afDatabase, afAuth);
    }

    getUserData(email: string) {
        return this.afDatabase.list('users', {
            query: {
                orderByChild: 'email',
                equalTo: email
            }
        })[0];
    }
}  