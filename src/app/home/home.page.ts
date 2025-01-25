import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertController, isPlatform, Platform, ViewDidEnter } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputText: string = '';
  constructor(
    public router: Router,
    private platform: Platform,
  ) { 
    this.platform.ready().then(() => {
      console.log('Platform ready');
      if (isPlatform('capacitor')) {
        GoogleAuth.initialize();
        console.log('GoogleAuth initialized for Capacitor');
      } else {
        GoogleAuth.initialize();
        console.log('GoogleAuth initialized for Web');
      }
    });
  }
  async googleSignIn() {
    try {
      const googleUser = await GoogleAuth.signIn();
      console.log('Google user:', googleUser);
      this.router.navigate(['/logout'], { state: { data: googleUser } });

      
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  }

}