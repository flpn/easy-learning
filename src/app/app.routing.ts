import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'home', component: HomeComponent }
];

export const COMPONENTS = [
    LoginComponent,
    SignUpComponent,
    HomeComponent
];

export const PARTIAL_COMPONENTS = [

];
