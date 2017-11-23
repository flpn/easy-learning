import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import { SiteService } from '../../../services/site.service';

import { PAGES } from '../../../utils/constants';

import { Group } from '../../../model/group';

@Component({
  selector: 'app-create-group',
  providers: [SiteService],
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  newGroup: Group

  constructor(private router: Router, private afDatabase: AngularFireDatabase, private siteService: SiteService) {
    this.newGroup = new Group();
    
   }

  ngOnInit() {

  }

  createGroup(){
    this.siteService.createGroup(this.newGroup)
    this.goToGroupHome();
    // this.afDatabase.list("groups").push(this.newGroup)
  }

  goToGroupHome() {
    this.router.navigate([PAGES.groupHome])
  } 

}
