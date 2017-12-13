import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../../services/site.service';

import { PAGES } from '../../../utils/constants';

import { Question } from '../../../model/question';

declare var $: any;

@Component({
  selector: 'app-create-question',
  providers: [SiteService],
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  newQuestion: Question;

  constructor(private router: Router, private siteService: SiteService, private auth: AngularFireAuth) {
    this.newQuestion = new Question();
    this.newQuestion.user = this.auth.auth.currentUser.uid;
   }

  ngOnInit() { 
    this.siteService.notLogged();
  }

  createQuestion() {
    this.siteService.createQuestion(this.newQuestion);
    this.goToForumHome();
  }  

  goToForumHome() {
    this.router.navigate([PAGES.forumHome])
  } 

  logout() {
    this.auth.auth.signOut()
      .then(() => this.router.navigate([PAGES.login]));
  }
}
