import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OauthComponent } from './components/oauth/oauth.component';
import { LoginComponent } from './screens/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'oauth', component: OauthComponent },
  { path: 'callback', component: OauthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
