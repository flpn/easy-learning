import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


import { SiteService } from '../../../services/site.service';

import { PAGES } from '../../../utils/constants';

import { Group } from '../../../model/group';

@Component({
  selector: 'app-groups-home',
  templateUrl: './groups-home.component.html',
  styleUrls: ['./groups-home.component.css']
})
export class GroupsHomeComponent implements OnInit {

  newGroup: Group;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    
    this.newGroup = new Group();
    // this.auth.auth.currentUser.uid;

   }

  ngOnInit() {}

  createGroup(){

    this.router.navigate([PAGES.createGroup])

    // this.afDatabase.list('groups').push(this.newGroup);
    // console.log("teste")
  }

}
