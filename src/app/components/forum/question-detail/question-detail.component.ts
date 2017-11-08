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
  show:boolean;
  answer: Answer;
  isLoading: boolean;
  answerAux: Answer; 
  index: number;

  constructor(private router: ActivatedRoute, private siteService: SiteService, private db: AngularFireDatabase, private auth: AngularFireAuth) { 
    this.answer = new Answer();
    this.show = false;
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

  setScoreQuestion(option: number) {
    if (!this.currentQuestion.voteLog) {
      this.currentQuestion.voteLog = new Map<string, number>();
      
    }

    let userUID = this.auth.auth.currentUser.uid;
    let scoreMarked = this.currentQuestion.voteLog.get(userUID);
    
    if (scoreMarked) {
      if ((scoreMarked + option) <= 1 && (scoreMarked + option) >= -1) {
        this.currentQuestion.voteLog.set(userUID, (scoreMarked + option)) 
        this.currentQuestion.score += option;
      }
    }
    else {
      this.currentQuestion.voteLog.set(userUID, option);
      this.currentQuestion.score += option;      
    }

    scoreMarked = this.currentQuestion.voteLog.get(userUID);
    console.log(scoreMarked);
    
    this.siteService.update<Question>(ENTITIES.question, this.currentQuestion.$key, this.currentQuestion);
  }

  setScoreAnswer(answer: Answer, option: number){
    this.answerAux = this.answer;
    this.answer = answer;
    this.answer.score += option;
    this.siteService.update<Question>(ENTITIES.question, this.currentQuestion.$key, this.currentQuestion);  
    this.answer = this.answerAux;
  }

  checkUser(userKey: string): boolean{
    return userKey === this.auth.auth.currentUser.uid
  }

  updateQuestion() {
    this.siteService.update<Question>(ENTITIES.question, this.currentQuestion.$key, this.currentQuestion)
  }

  removeAnswer(answer: Answer){
    var index = this.currentQuestion.answers.indexOf(answer);
    this.currentQuestion.answers.splice(index, 1);
    this.updateQuestion();
  }

  edit(answer: Answer){
    this.index = this.currentQuestion.answers.indexOf(answer);
    if(this.show){
      this.show = false;
    }else{
      this.show = true;
    }
  }

  updateAnswer(answer: Answer){
    this.currentQuestion.answers[this.index] = answer;
    this.updateQuestion();
    this.show = false    
  }

  bestAnswer(answer: Answer) {
    this.currentQuestion.bestAnswer = answer;
    this.updateQuestion();
  }

  hideBestAnswer(answer: Answer) {
    return answer.text !== this.currentQuestion.bestAnswer.text;
  }
}
