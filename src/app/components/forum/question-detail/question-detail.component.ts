import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../../services/site.service';

import { ENTITIES } from '../../../utils/constants';

import { Question } from '../../../model/question';
import { Answer } from '../../../model/answer';

@Component({
  selector: 'app-question-detail',
  providers: [SiteService],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  currentQuestion: Question;
  answer: Answer;
  isLoading: boolean;

  constructor(private router: ActivatedRoute, private siteService: SiteService, private db: AngularFireDatabase, private auth: AngularFireAuth) { 
    this.answer = new Answer();
  }
  
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

  createAnswer() {
    if (!this.currentQuestion.answers) {
      this.currentQuestion.answers = [];
    }

    this.answer.user = this.auth.auth.currentUser.uid;
    
    this.currentQuestion.answers.push(this.answer);
    this.siteService.createAnswer(this.currentQuestion);

    this.answer = new Answer();
  }

  getUserInfo(uid: string) {
    this.siteService.get(ENTITIES.user, 'uid', uid).then(user => {
      return user;
    })
  }
}
