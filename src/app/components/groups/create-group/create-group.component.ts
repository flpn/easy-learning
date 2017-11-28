import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../../services/site.service';

import { ENTITIES, PAGES } from '../../../utils/constants';

import { Group } from '../../../model/group';
import { User } from '../../../model/user';

@Component({
  selector: 'app-create-group',
  providers: [SiteService],
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  newGroup: Group
  currentUser: User

  constructor(private router: Router,private siteService: SiteService, private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.newGroup = new Group();
    
   }

  ngOnInit() {
    this.siteService.notLogged();
    this.getUser();
  }

  createGroup(){
    this.newGroup.adm = this.currentUser
    this.newGroup.subscribers.push(this.currentUser)
     this.siteService.createGroup(this.newGroup)
     this.goToGroupHome();
    console.log(this.currentUser.name)
    // this.afDatabase.list("groups").push(this.newGroup)
  }

  goToGroupHome() {
    this.router.navigate([PAGES.groupHome])
  }
  
  
  getUser(){
    this.db.list(ENTITIES.user)
    .subscribe(list => {
        list.forEach(u => {
          if (this.auth.auth.currentUser.uid === u.uid) {
            this.currentUser = u;
            }
        });
    });
  }

  
}
