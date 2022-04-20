import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform : Platform) { this.initializeApp() }

  initializeApp() {
    this.platform.ready().then(() => {
      // INITIALIZE FIREBASE
      firebase.initializeApp(environment.firebaseConfig);
    });

  }
}
