import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OauthComponent } from './components/oauth/oauth.component';
import { LoginComponent } from './screens/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OauthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
