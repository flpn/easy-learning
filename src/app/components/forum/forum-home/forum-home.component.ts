import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { PAGES, ENTITIES } from '../../../utils/constants';

import { SiteService } from '../../../services/site.service';

import { Question } from '../../../model/question';

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

  constructor(private siteService: SiteService, private router: Router, private auth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.initializeList();
  }

  initializeList(){
    this.latestQuestions = this.db.list(ENTITIES.question, {
      query: {
        orderByChild: 'score'
      }
    }).map((array) => array.reverse())
  }

  goToCreateQuestion() {
    this.router.navigate([PAGES.createQuestion]);
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
}
