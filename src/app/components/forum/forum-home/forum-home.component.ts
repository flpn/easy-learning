import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { PAGES, ENTITIES, SCORE } from '../../../utils/constants';

import { SiteService } from '../../../services/site.service';

import { Question } from '../../../model/question';
import { User } from '../../../model/user';

@Component({
  selector: 'app-forum-home',
  providers: [SiteService],
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {

  latestQuestions: Observable<any>;
  searchQuestions: string
  str: string
  currentUser: User;
  scoreCurrent: Number

  constructor(private siteService: SiteService, private router: Router, private auth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.initializeList();
    this.getUser();
  }

  initializeList(){
    this.latestQuestions = this.db.list(ENTITIES.question, {
      query: {
        orderByChild: 'score'
      }
    }).map((array) => array.reverse())
  }

  goToCreateQuestion() {
    if(!this.verifyScoreUser()){

      this.router.navigate([PAGES.createQuestion]);

    }else{
      alert('Sua pontuação é muito baixa para fazer uma pergunta no Fórum!')
    }
  }

  searchQuestion(){
    if(this.searchQuestions === ""){
      this.initializeList()
    }else{
      this.latestQuestions = this.db.list(ENTITIES.question, {
        query: {
          orderByChild: 'score'
        }
      }).map(itens => itens.filter(item => item.tags.toUpperCase().includes(this.searchQuestions.toUpperCase())
                || item.title.toUpperCase().includes(this.searchQuestions.toUpperCase())
                || item.text.toUpperCase().includes(this.searchQuestions.toUpperCase())
              ))
        .map((array) => array.reverse())
    }
  }

  isGoodQuestion(votes: number) {
    return votes >= 10;
  }

  isBadQuestion(votes: number) {
    return votes <= -3;
  }

  searchQuestionDate(){
    this.latestQuestions = this.db.list(ENTITIES.question, {
      query: {
        orderByChild: 'published'
      }
    }).map((array) => array.reverse())
  }

  getUser(){
    this.db.list(ENTITIES.user)
    .subscribe(list => {
        list.forEach(u => {
          if (this.auth.auth.currentUser.uid === u.uid) {
            this.currentUser = u;
            this.scoreCurrent = this.currentUser.score
          }
        });
    });
  }

  verifyScoreUser(): boolean{
    return this.scoreCurrent <= SCORE.minimumScoreUser;
  }
}
