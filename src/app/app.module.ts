// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


// services
import { WeatherService } from './services/weather.service';
import { AuthService } from './services/auth.service';
import { UIService } from './services/ui.service';
import { PushNotificationsService } from './services/push.notification.service';

// components
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PastWeatherLocationsComponent } from './dashboard/past-weather-locations/past-weather-locations.component';
import { NewWeatherLocationComponent } from './dashboard/new-weather-location/new-weather-location.component';
import { PushNotificationComponent } from './push-notification/app.component.pushnotification';

const config = {
  apiKey: "AIzaSyB8YRxTVp2Mnzp2cojkjwr34teRPIDP-SQ",
  authDomain: "ng-weather-app-cfc45.firebaseapp.com",
  databaseURL: "https://ng-weather-app-cfc45.firebaseio.com",
  projectId: "ng-weather-app-cfc45",
  storageBucket: "ng-weather-app-cfc45.appspot.com",
  messagingSenderId: "21841211670"
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    PastWeatherLocationsComponent,
    NewWeatherLocationComponent,
    SignInComponent,
    PushNotificationComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [WeatherService, AuthService, UIService, PushNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
