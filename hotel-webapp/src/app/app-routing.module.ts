import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'success', component: BookingSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
