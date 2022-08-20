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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar/sidebar-item/sidebar-item.component';
import { RoomsComponent } from './screens/dashboard/rooms/rooms.component';
import { OverviewComponent } from './screens/dashboard/overview/overview.component';
import { AppTitleComponent } from './components/app-title/app-title.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { RoomAddComponent } from './components/room-add/room-add.component';

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
    SidebarComponent,
    SidebarItemComponent,
    RoomsComponent,
    OverviewComponent,
    AppTitleComponent,
    RoomItemComponent,
    RoomAddComponent,
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
