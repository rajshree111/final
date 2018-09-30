import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../user';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  name: string;

  pagetoshow: Boolean  = true;

  user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private http: HttpClient, private router: Router, private authService: AuthService ) {
      console.log('inside constructor...');
//// Get auth data, then get firestore user document || null
this.user$ = this.afAuth.authState.pipe(
switchMap(user => {
if (user) {
  return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
} else {
  return of(null);
}
})
);
    }
 
signup(){
  return this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then(value => {
    console.log('Success!', value);
    this.loginPage();
    return this.updateUserData( value.user,new User(this.email,this.password,this.name) );

})
.catch(err => {
    confirm(err.message);
    console.log('Something went wrong:', err.message);
});

    }

login(){
  console.log('############################');
  this.login1(this.email, this.password);
}

login1(email: string, password: string) {
  // this.afAuth
  //     .auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(value => {
  //         console.log('Nice, it worked!');
  //         console.log(this.afs.collection('users'));
  
  //     })
  //     .catch(err => {
  //         console.log('Something went wrong:', err.message);
  //     });

  console.log('###########################################################3333');
  const headers = new HttpHeaders().set("Content-Type", "application/json");
  headers.set('Access-Control-Allow-Origin', '*');


    return this.http.post('https://us-central1-test-auth-a.cloudfunctions.net/testFunc', JSON.stringify({"email" : email,"password" : password}),{headers}).subscribe(
      token => {
  console.log(token['message']);
  this.afAuth
      .auth.signInWithCustomToken(token['message'])
      .then(value => {
          console.log('Nice, it worked!');
         // console.log(this.afs.collection('users'));
         this.router.navigate(['home']);
         this.authService.changeMessage(true);
      })
      .catch(err => {
          console.log('Something went wrong:', err.message);
      });
      }
    );
}

    

    // Sets user data to firestore after succesful login
    private updateUserData(user: firebase.User, auser: User) {
      //this.auser = new Users(this.ema);
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
          `user/${user.uid}`
      );
      return userRef.set(Object.assign({}, auser), { merge: true });
  }

  ngOnInit() {
  }

  logout(){
    this.authService.signOut();
    this.authService.changeMessage(false);
  }

  loginPage() {
    this.pagetoshow = true;
  }

  signupPage() {
    this.pagetoshow = false;
  }

}
