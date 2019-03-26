import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // property to store loading state subscription
  isLoading = false;
  private loadingSubscription: Subscription;
  // property to store error subscription
  private errorSubscription: Subscription;
  error = false;

  constructor(
    private weatherService: WeatherService, 
    private authService: AuthService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    // loading the user's saved locations data from the db
    this.authService.loadFromDb()

    // listen for loading state
    this.loadingSubscription = this.uiService.loadingStateChanged
      .subscribe((isLoading) => {
        this.isLoading = isLoading
      })

    // listening for search errors 
    this.errorSubscription = this.weatherService.searchError
      .subscribe((boolean) => {
        this.error = boolean
      })
  }

  onSubmit(form: NgForm) {
    // passing the input data to a method in my weatherService
    // this method will then query the api 
    this.weatherService.getWeatherData(form.value.weatherSearchData)
    form.reset()
  }

  ngOnDestroy() {
    // unsubscribing from subscription --  to avoid memory leaks
    this.errorSubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
  }

}
