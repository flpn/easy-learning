import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../../services/site.service';

import { ENTITIES, SCORE, PAGES } from '../../../utils/constants';

import { Group } from '../../../model/group';
import { QuestionGroup } from '../../../model/questionGroup';


@Component({
  selector: 'app-question-group',
  providers: [SiteService],
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.css']
})
export class QuestionGroupComponent implements OnInit {

  currentGroup: Group;

  constructor(private router: ActivatedRoute, private routerPage: Router,
    private siteService: SiteService, private db: AngularFireDatabase,
     private auth: AngularFireAuth) { }

  ngOnInit() {
    this.getKey();
  }

  getKey() {
    this.router.params.subscribe(params => {
      this.findGroup(params['group-key'])
     });
  }

  findGroup(groupKey: string) {
    this.siteService.find<Group>(ENTITIES.group, groupKey).then(group => {
      this.currentGroup = group;
    console.log(this.currentGroup.questions)
    
    })
  }

}
