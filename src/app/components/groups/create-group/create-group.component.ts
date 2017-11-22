import { Component, OnInit } from '@angular/core';

import { Group } from '../../../model/group';

import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  newGroup: Group

  constructor(private router: Router, private afDatabase: AngularFireDatabase) {
    this.newGroup = new Group();
    
   }

  ngOnInit() {

  }

  createGroup(){
    this.afDatabase.list("groups").push(this.newGroup)
  }

}
