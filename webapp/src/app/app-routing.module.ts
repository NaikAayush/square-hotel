import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { OverviewComponent } from './screens/dashboard/overview/overview.component';
import { RoomsComponent } from './screens/dashboard/rooms/rooms.component';
import { LoginComponent } from './screens/login/login.component';
import { OnboardingComponent } from './screens/onboarding/onboarding.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'dashboard', redirectTo: 'dashboard/overview', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'rooms', component: RoomsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
