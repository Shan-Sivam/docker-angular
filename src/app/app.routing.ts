import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { AllUsersComponent } from './summaries/all-users.component';
import { LatestNewsComponent } from './summaries/latest-news.component';
import { TestComponent } from './summaries/test.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'all-users', component: AllUsersComponent },
    { path: 'latest-news', component: LatestNewsComponent },
    { path: 'test', component: TestComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
