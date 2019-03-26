import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-weather-location',
  templateUrl: './new-weather-location.component.html',
  styleUrls: ['./new-weather-location.component.css']
})
export class NewWeatherLocationComponent implements OnInit, OnDestroy{
  savedSubscription: Subscription;
  saved;
  locationWeatherData;

  constructor(private weatherService: WeatherService, private authService: AuthService) { }

  ngOnInit() {

    // listening for whether or not the searched location has already been saved
    this.savedSubscription = this.weatherService.locationSaved
      .subscribe((boolean) => {
        this.saved = boolean
      })

    // getting the searched weather location data to be displayed
    this.locationWeatherData = this.weatherService.returnLocationData()
  }

  saveLocation() {
    // add city name to user's saved cities
    this.weatherService.addLocation(this.locationWeatherData.city)

    this.weatherService.isSaved(this.locationWeatherData.city)

    this.authService.addToDb(this.locationWeatherData.city)
  }

  ngOnDestroy() {
    // unsubscribing from subscription -- to avoid memory leaks
    this.savedSubscription.unsubscribe()
  }
}
