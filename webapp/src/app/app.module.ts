import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { OauthComponent } from './components/oauth/oauth.component';
import { LoginComponent } from './screens/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingPipe } from './pipes/loading.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OauthComponent,
    LoginComponent,
    LoaderComponent,
    LoadingPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
