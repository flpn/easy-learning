import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { SiteService } from '../../../services/site.service';

import { ENTITIES } from '../../../utils/constants';

import { Question } from '../../../model/question';

@Component({
  selector: 'app-question-detail',
  providers: [SiteService],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  currentQuestion: Question;
  isLoading: boolean;

  constructor(private router: ActivatedRoute, private siteService: SiteService, private db: AngularFireDatabase) { }
  
  ngOnInit() {
    this.isLoading = true;
    this.siteService.notLogged();
    this.getKey();
  }

  getKey() {
    this.router.params.subscribe(params => {
      this.findQuestion(params['question-key'])
    });
  }

  findQuestion(questionKey: string) {
    this.siteService.find<Question>(ENTITIES.question, questionKey).then(question => {
      this.currentQuestion = question;
      this.isLoading = false;
    })
  }
}
