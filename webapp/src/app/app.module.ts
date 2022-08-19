import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OnboardingComponent } from './screens/onboarding/onboarding.component';
import { CookieService } from 'ngx-cookie-service';
import { SuccessBadgeComponent } from './components/badge/success-badge/success-badge.component';
import { FailBadgeComponent } from './components/badge/fail-badge/fail-badge.component';
import { WarningBadgeComponent } from './components/badge/warning-badge/warning-badge.component';
import { BadgeComponent } from './components/badge/badge.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './screens/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    OnboardingComponent,
    SuccessBadgeComponent,
    FailBadgeComponent,
    WarningBadgeComponent,
    BadgeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
