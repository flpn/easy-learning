import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../../services/site.service';

import { ENTITIES, SCORE, PAGES } from '../../../utils/constants';

import { Group } from '../../../model/group';
import { User } from '../../../model/user';
import { GroupPosts } from '../../../model/group-posts';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  currentGroup: Group;
  newPost: GroupPosts;
  postList: GroupPosts[];
  currentUser: User;
  
  constructor(private router: ActivatedRoute, private routerPage: Router, private siteService: SiteService,
     private db: AngularFireDatabase, private auth: AngularFireAuth) { 

      this.newPost = new GroupPosts();
      this.currentGroup = new Group();
      // this.currentGroup.groupPosts
  }

  ngOnInit() {
    this.siteService.notLogged();
    this.getKey();
    
    this.getUser() 
    // this.checkGroupList()
    // this.postList = this.currentGroup.groupPosts;
 }

  checkGroupList(){
    if(!this.currentGroup.groupPosts){
      this.currentGroup.groupPosts = []
  }

  }

  getKey() {
    this.router.params.subscribe(params => {
      this.findGroup(params['group-key'])
    });
  }

  findGroup(groupKey: string) {
    this.siteService.find<Group>(ENTITIES.group, groupKey).then(group => {
      this.currentGroup = group;
      this.postList = this.currentGroup.groupPosts
    })
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


  post(){
    if(!this.currentGroup.groupPosts){
        this.currentGroup.groupPosts = []
    }
    this.newPost.user = this.currentUser;   
    this.currentGroup.groupPosts.push(this.newPost);
    this.siteService.update<Group>(ENTITIES.group, this.currentGroup.$key, this.currentGroup)
    // this.siteService.createGroup(this.currentGroup)
    // console.log(this.newPost.text)
  }

}
