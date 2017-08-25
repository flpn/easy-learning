import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

export class BaseService {

    subscriptions: any[] = [];

    constructor(private afDatabase: AngularFireDatabase, private afAuth :AngularFireAuth) { }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    insert<T>(entity: string, obj: T):string {
      return this.afDatabase.list(entity).push(obj).key;
    }

    remove<T>(entity: string, key: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            this.afDatabase.list(entity).remove(key)
                .then(() => resolve())
                .catch(error => reject(error))
        });
    }

    retrieve<T>(entity: string, property: string, value: any): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            let subscription = this.afDatabase.list(entity, {
                query: {
                    orderByChild: property,
                    equalTo: value
                }
                })
                .subscribe(
                    result => resolve(result),
                    error => reject(error)
                );

            this.subscriptions.push(subscription);
        })
    }

    get<T>(entity: string, property: string, value: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let subscription = this.afDatabase.list(entity, {
                query: {
                    orderByChild: property,
                    equalTo: value
                }
                })
                .subscribe(
                    result => resolve(result[0]),
                    error => reject(error)
                );

            this.subscriptions.push(subscription);
        })
    }

    find<T>(entity: string, key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let subscription = this.afDatabase.object(`/${entity}/${key}`)
                .subscribe(entity => resolve(entity))

            this.subscriptions.push(subscription);
        })
    }

    update<T>(entity: string, key: string, data: any) {
        return this.afDatabase.list(entity).update(key, data);
    }

    getObservable<T>(entity: string, property: string, value: any): Observable<T[]> {
        return this.afDatabase.list(entity, {
            query: {
                orderByChild: property,
                equalTo: value
            }
        });
    }

    getCurrentUserEmail(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.afAuth.authState.subscribe(user => {
                if (user != null) {
                    resolve(user.email);
                } else {
                    reject('user is not logged');
                }
            })
        });
    }   
}