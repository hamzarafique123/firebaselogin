import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  user: any;

  constructor(
    public router:Router,private platform: Platform
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

  ngOnInit() {
    this.user = history.state.data;
  }

  async logout(){
    await GoogleAuth.signOut();
    this.user = null ;
    this.router.navigate(['/home'])
  }
}