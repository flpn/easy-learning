import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ForumHomeComponent } from './components/forum/forum-home/forum-home.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'forumHome', component: ForumHomeComponent }
];

export const COMPONENTS = [
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ForumHomeComponent
];

export const PARTIAL_COMPONENTS = [

];
