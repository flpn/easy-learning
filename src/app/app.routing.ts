import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ForumHomeComponent } from './components/forum/forum-home/forum-home.component';
import { CreateQuestionComponent } from './components/forum/create-question/create-question.component';
import { QuestionDetailComponent } from './components/forum/question-detail/question-detail.component';
import { GroupsHomeComponent } from './components/groups/groups-home/groups-home.component';
import { GroupDetailComponent } from './components/groups/group-detail/group-detail.component';
import { CreateGroupComponent } from './components/groups/create-group/create-group.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'groupsHome', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'forumHome', component: ForumHomeComponent },
    { path: 'createQuestion', component: CreateQuestionComponent },
    { path: 'question/:question-key', component: QuestionDetailComponent },
    { path: 'groupsHome', component: GroupsHomeComponent }, 
    { path: 'createGroup', component: CreateGroupComponent},   
    
    //Routing fake
    { path: 'group', component: GroupDetailComponent }    
    
    // Routing correto    
    // { path: 'group/:group-key', component: GroupDetailComponent }    
];

export const COMPONENTS = [
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ForumHomeComponent,
    CreateQuestionComponent,
    QuestionDetailComponent,
    GroupsHomeComponent,
    GroupDetailComponent,
];

export const PARTIAL_COMPONENTS = [

];
