import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UIService } from './ui.service';

@Injectable()
export class WeatherService {
  // api properties
  private apiKey: string = '&appid=796a7a198d2f67becf32918b487b2906'
  private cityEndpoint: string = 'https://api.openweathermap.org/data/2.5/weather?q='
  private zipEndpoint: string = 'https://api.openweathermap.org/data/2.5/weather?zip='
  private units: string = '&units=imperial'

  // subject observable to broadcast when there is an error in the weather location search
  searchError = new Subject<boolean>()
  // subject observable to broadcast whether a location is already saved 
  locationSaved = new Subject<boolean>()

  dataReceived = new Subject<boolean>()

  // searched weather location data
  searchedLocationData = {
    city: '',
    conditions: '',
    icon: '',
    temp: '',
    tempMin: '',
    tempMax: '',
    pressure: '',
    windSpeed: '',
    humidity: '',
    description: ''
  }
  
  userLocations = []
  userLocationsData = []

  constructor(private http: HttpClient, private uiService: UIService) {}


  getSavedLocations() {
    return this.userLocations
  }

  // checking if the returned search location has already been saved
  isSaved(cityName) {
    // checks if the passed in city name already exists on the userLocations array
    // if so, broadcasts true for the locationSaved Subject
    if (this.userLocations.indexOf(cityName) > -1) {
      this.locationSaved.next(true)
    } else {
      this.locationSaved.next(false)
    }
  }

  // setting the users saved locations off of db
  setSavedLocations(savedLocations) {
    const locations = []

    savedLocations.forEach((location) => {
      return locations.push(location.cityName)
    })

    this.userLocations = locations
  }

  // take in the saved city names and set their weather data from the api
  setSavedLocationData() {
    const locationData = []

    this.userLocations.forEach((location) => {
      return this.http.get(this.cityEndpoint + location + this.units + this.apiKey)
      .subscribe((res:any) => {
        locationData.push({
          name: res.name,
          conditions: res.weather[0].main,
          icon: 'https://openweathermap.org/img/w/' + res.weather[0].icon + '.png',
          temp: res.main.temp, 
          tempMin: res.main.temp_min,
          tempMax: res.main.temp_max,
          pressure: res.main.pressure,
          windSpeed: res.wind.speed,
          humidity: res.main.humidity
        })
      }, (error) => {
        console.log(error.message)
      })
    })
    
    this.userLocationsData = locationData
  }

  // return the user's saved cities data
  getSavedLocationData() {
    return this.userLocationsData
  }
  
  // add location to user's saved cities
  addLocation(cityName) {
    this.userLocations.push(cityName)
  }

  // getting weather data from api for searched location
  getWeatherData(searchData) {
    // set loading state to true
    this.uiService.loadingStateChanged.next(true)
    // check if searched by city name or zip code
    if (isNaN(searchData)) {
      return this.http.get(this.cityEndpoint + searchData + this.units + this.apiKey)
        .subscribe((res:any) => {
          // set loading state to false
          this.uiService.loadingStateChanged.next(false)

          this.searchedLocationData.city = res.name
          this.searchedLocationData.conditions = res.weather[0].main
          this.searchedLocationData.icon = 'https://openweathermap.org/img/w/' + res.weather[0].icon + '.png'
          this.searchedLocationData.temp = res.main.temp
          this.searchedLocationData.tempMin = res.main.temp_min
          this.searchedLocationData.tempMax = res.main.temp_max
          this.searchedLocationData.pressure = res.main.pressure
          this.searchedLocationData.windSpeed = res.wind.speed
          this.searchedLocationData.humidity = res.main.humidity
          this.searchedLocationData.description = res.weather[0].description
          
          this.searchError.next(false)
          this.isSaved(this.searchedLocationData.city)
          this.dataReceived.next(true)
        },(error) => {
          this.searchError.next(true)
          this.uiService.loadingStateChanged.next(false)
          this.dataReceived.next(false)
        })
    } else {
      return this.http.get(this.zipEndpoint + searchData + this.units + this.apiKey)
        .subscribe((res:any) => {
          // set loading state to false
          this.uiService.loadingStateChanged.next(false)

          this.searchedLocationData.city = res.name
          this.searchedLocationData.conditions = res.weather[0].main
          this.searchedLocationData.icon = 'https://openweathermap.org/img/w/' + res.weather[0].icon + '.png'
          this.searchedLocationData.temp = res.main.temp
          this.searchedLocationData.tempMin = res.main.temp_min
          this.searchedLocationData.tempMax = res.main.temp_max
          this.searchedLocationData.pressure = res.main.pressure
          this.searchedLocationData.windSpeed = res.wind.speed
          this.searchedLocationData.humidity = res.main.humidity
          this.searchedLocationData.description = res.weather[0].description
          
          this.searchError.next(false)
          this.isSaved(this.searchedLocationData.city)
          this.dataReceived.next(true)
        },(error) => {
          this.searchError.next(true)
          this.uiService.loadingStateChanged.next(false)
          this.dataReceived.next(false)
        })
    } 
  }

  // returning the searched location data
  returnLocationData() {
    this.isSaved(this.searchedLocationData.city)
    return this.searchedLocationData
  }

}
