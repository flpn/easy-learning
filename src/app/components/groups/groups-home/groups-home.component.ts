import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { SiteService } from '../../../services/site.service';

import { PAGES, ENTITIES} from '../../../utils/constants';

import { Group } from '../../../model/group';
import { User } from '../../../model/user';

@Component({
  selector: 'app-groups-home',
  templateUrl: './groups-home.component.html',
  styleUrls: ['./groups-home.component.css']
})
export class GroupsHomeComponent implements OnInit {

  groupList: Observable<any>;
  currentGroup: Group;
  currentUser: User;
  show: boolean

  constructor(private router: Router, private afAuth: AngularFireAuth,
     private afDatabase: AngularFireDatabase, private db: AngularFireDatabase,
     private auth: AngularFireAuth,private siteService: SiteService) {
  
   }

  ngOnInit() {
    this.groupList = this.afDatabase.list(ENTITIES.group)
    this.getUser()
    // this.verifyUser1()
  }

  createGroup(){
    
    this.router.navigate([PAGES.createGroup])
    console.log(this.currentGroup.subscribers.includes(this.currentUser))

    console.log("teste")
  }

  subscribe(key: string){
   this.afDatabase.list(ENTITIES.group)
    .subscribe(list => 
      list.filter(group => {
        if(group.$key == key){
          this.currentGroup = group
            if(!this.currentGroup.requests){
              this.currentGroup.requests = []  
            } 
            this.currentGroup.requests.push(this.currentUser)
            this.siteService.update(ENTITIES.group, key, this.currentGroup)
            console.log("solicitação enviada")  
          } 
        })
      )
    }

  getUser() {
    this.db.list(ENTITIES.user)
      .subscribe(list => {
        list.forEach(u => {
          if (this.auth.auth.currentUser.uid === u.uid) {
            this.currentUser = u;
    
          }
        });
      });
    }

  verifyUser(group: Group): boolean{
    // console.log(group.subscribers.includes(this.currentUser))
    return !group.subscribers.includes(this.currentUser)

  }

  verifyUser1() {
    this.afDatabase.list(ENTITIES.group)


  }

}
