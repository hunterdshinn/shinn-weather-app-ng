import { Component, OnInit} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-past-weather-locations',
  templateUrl: './past-weather-locations.component.html',
  styleUrls: ['./past-weather-locations.component.css']
})
export class PastWeatherLocationsComponent implements OnInit{
  savedLocationData = [];
  hasSaved: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    // setting the saved weather data
    this.weatherService.setSavedLocationData()

    // getting the saved weather data to be displayed
    this.savedLocationData = this.weatherService.getSavedLocationData() 

    // workaround for delayed conditional rendering 
    setTimeout(() => {
      this.checkIfSaved()
    }, 500)

  }

  checkIfSaved() {
    if (this.savedLocationData.length !== 0) {
      this.hasSaved = true
    } else {
      this.hasSaved = false
    }
  }
}
