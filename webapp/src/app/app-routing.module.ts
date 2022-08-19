import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LoginComponent } from './screens/login/login.component';
import { OnboardingComponent } from './screens/onboarding/onboarding.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
