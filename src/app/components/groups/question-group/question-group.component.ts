import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { SiteService } from '../../../services/site.service';

import { ENTITIES, SCORE, PAGES } from '../../../utils/constants';

import { Group } from '../../../model/group';
import { QuestionGroup } from '../../../model/questionGroup';
import { User } from '../../../model/user'
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-question-group',
  providers: [SiteService],
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.css']
})
export class QuestionGroupComponent implements OnInit {

  
  currentGroup: Group;
  currentUser: User;
  alternative: boolean;
  index: number;

  constructor(private router: ActivatedRoute, private routerPage: Router,
    private siteService: SiteService, private db: AngularFireDatabase,
     private auth: AngularFireAuth) { 
      this.currentGroup = new Group();
      this.alternative = true;
     }

  ngOnInit() {
    this.getKey();
    this.getUser()
    
  }

  getUser() {
    this.db.list(ENTITIES.user)
      .subscribe(list => {
        list.forEach(u => {
          if (this.auth.auth.currentUser.uid === u.uid) {
            this.currentUser = u;
          }
        });
      });
    }


  getKey() {
    this.router.params.subscribe(params => {
      this.findGroup(params['group-key'])
     });
  }

  findGroup(groupKey: string) {
    this.siteService.find<Group>(ENTITIES.group, groupKey).then(group => {
      this.currentGroup = group;
    
    })
  }

  teste(question: QuestionGroup, str: string){
    console.log(question.correctAlternative.text === str)
    this.alternative = question.correctAlternative.text === str
  }

  answerQuestion(){
    if(this.alternative){
      this.currentUser.score += SCORE.incrementQuestionGroup
      this.siteService.update<User>(ENTITIES.user, this.currentUser.$key, this.currentUser)
      alert("Resposta correta!")      
    }else{
      alert("Resposta errada!")
    }
    
  }

}
