import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WeatherService } from './weather.service';

@Injectable()
export class AuthService {
  // subject observable to broadcast auth state changes
  authChange = new Subject<boolean>()
  // property to store authentication status
  private isAuthenticated = false;
  // property to store the logged in user's id
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private weatherService: WeatherService
  ) { }

  // making use of authState observable to execute some tasks based on if a user object exists
  initAuthListener() {
    this.afAuth.authState
      .subscribe((user) => {
        if (user) {
          // set isAuthenticated to true
          this.isAuthenticated = true
          // store the users uid
          this.uid = user.uid
          // emit that the auth status has changed to true
          this.authChange.next(true)
          // redirect the user 
          this.router.navigate(['/my-dashboard'])
        } else {
          // emit that the auth status has changed to false
          this.authChange.next(false)
          // set isAuthenticated to false
          this.isAuthenticated = false
          // redirect the user
          this.router.navigate(['/signin'])
        }
      })
  }

  // sign user in with google account
  signIn() {
    const provider = new auth.GoogleAuthProvider()
    
    this.afAuth.auth.signInWithPopup(provider)
      .then(() => {
        // console.log('Successfully logged in')
      })
      .catch((error) => {
        console.log(error.message)    
      })
  }

  // sign user out
  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        // console.log('Successfully signed out.')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  // getting the saved city names from the db
  loadFromDb() {
    this.db.collection('savedCities')
    .valueChanges()
    .subscribe((savedLocations) => {
      this.weatherService.setSavedLocations(savedLocations, this.uid)
    }, (error) => {
      // console.log(error)
    })
  }

  // add city name to db with logged in user's id
  addToDb(cityName) {
    this.db.collection('savedCities').add({
      cityName: cityName,
      uid: this.uid
    })
  }  
  
  // returns whether or not there is an authenticated user
  isAuth() {
    return this.isAuthenticated
  }
}