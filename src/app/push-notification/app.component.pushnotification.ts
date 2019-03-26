import { Component, OnInit, OnDestroy } from '@angular/core';
import { PushNotificationsService } from '../services/push.notification.service';
import { WeatherService } from '../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'push-notification',
  templateUrl: 'app.component.pushnotification.html',
})
export class PushNotificationComponent implements OnInit, OnDestroy {
  locationWeatherData;
  dataReceived: Subscription;
  
  constructor(private _notificationService: PushNotificationsService, private weatherService: WeatherService) {
    this._notificationService.requestPermission();
  }

  ngOnInit() {
    // listening for data being returned from the search -- and notifying the user of specific data
    this.dataReceived = this.weatherService.dataReceived
      .subscribe((boolean) => {
        if (boolean) {
          this.locationWeatherData = this.weatherService.returnLocationData()
          this.notify()
        }
      })
  }

  notify() {
    // setting the contents of the notification
    const city = this.locationWeatherData.city
    const description = this.locationWeatherData.description

    let data: Array < any >= [];
    data.push({
        'title': 'Weather Alert!',
        'alertContent': 'Expect ' + description + ' in ' + city + ' today.'
    });
    this._notificationService.generateNotification(data);
  }

  ngOnDestroy() {
    // unsubscribing from subscription -- to prevent memory leaks
    this.dataReceived.unsubscribe()
  }

}