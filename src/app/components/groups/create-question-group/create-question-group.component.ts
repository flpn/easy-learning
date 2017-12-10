import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { SiteService } from '../../../services/site.service';

import { ENTITIES } from '../../../utils/constants';

import { QuestionGroup } from '../../../model/questionGroup'
import { Alternative } from '../../../model/alternative'
import { Group } from '../../../model/group'

@Component({
  selector: 'app-create-question-group',
  templateUrl: './create-question-group.component.html',
  styleUrls: ['./create-question-group.component.css']
})
export class CreateQuestionGroupComponent implements OnInit {

  newQuestion: QuestionGroup;
  newAlternative: Alternative;
  currentGroup: Group;

  constructor(private router: ActivatedRoute, private siteService: SiteService,
    private db: AngularFireDatabase) {
    this.newQuestion = new QuestionGroup()
    this.newAlternative = new Alternative()
    // this.currentGroup = new Group();

  }

  ngOnInit() { 
    this.getKey()
  }
  
  getKey() {
    this.router.params.subscribe(params => {
      this.findQuestion(params['group-key'])
    });
  }

  findQuestion(groupKey: string) {
    this.siteService.find<Group>(ENTITIES.group, groupKey).then(group => {
      this.currentGroup = group;
    })
  }

  saveAlternative() {
    if(!this.newQuestion.alternative){
      this.newQuestion.alternative = []
    }

    this.newQuestion.alternative.push(this.newAlternative)
    this.newAlternative = new Alternative()
  }

  createQuestion(){
    if(!this.currentGroup.questions){
      this.currentGroup.questions = []
    }

    this.currentGroup.questions.push(this.newQuestion)
    this.newQuestion = new QuestionGroup();
    this.siteService.update<Group>(ENTITIES.group, this.currentGroup.$key, this.currentGroup)  
    
    console.log(this.currentGroup)
  }

}
