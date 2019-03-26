import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener()

    this.authSubscription = this.authService.authChange
      .subscribe((authStatus) => {
        this.isAuth = authStatus
      })
  }

  ngOnDestroy() {
    // unsubscribing from subscriptions -- to avoid memory leaks
    this.authSubscription.unsubscribe()
  }
}
