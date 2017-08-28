import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  latestQuestions: FirebaseListObservable<any>;

  constructor(private siteService: SiteService, private router: Router, private auth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.latestQuestions = this.db.list(ENTITIES.question);
  }


  goToCreateQuestion() {
    this.router.navigate([PAGES.createQuestion]);
  }
}
