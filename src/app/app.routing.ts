import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
];

export const COMPONENTS = [
    LoginComponent
];

export const PARTIAL_COMPONENTS = [

];
