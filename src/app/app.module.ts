import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {CoreModule} from './core/core.module';
import { LoginComponent } from './core/login/login.component';
import { AngularFireModule } from '@angular/fire';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HeadersComponent } from './headers/headers.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';



export const config = {
  apiKey: "AIzaSyBgL-UIryin5me3ZPaCkKgDEcbkUCf3tEM",
  authDomain: "test-auth-a.firebaseapp.com",
  databaseURL: "https://test-auth-a.firebaseio.com",
  projectId: "test-auth-a",
  storageBucket: "",
  messagingSenderId: "764222078854"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeadersComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
