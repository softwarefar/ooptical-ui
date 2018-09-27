import {Component, OnInit} from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [`:host {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    flex: 1 1 1 e-09px;
  }`]
})
export class AppComponent implements OnInit {

  environment = environment;

  constructor() {
  }

  ngOnInit() {
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${this.environment.firebase.apiMap}&libraries=places`;
    document.getElementsByTagName('body')[0].appendChild(s);
  }

}
