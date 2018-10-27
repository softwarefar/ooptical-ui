import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './mat.module';

import {SHARED_COMPONENTS} from './components';
import {SHARED_PIPES} from './pipes';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { NgAisModule } from 'angular-instantsearch';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

const FIRE_BASE  = [
  AngularFireModule,
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule,
];

library.add(fas, far, fab);

@NgModule({
  declarations: [
    SHARED_COMPONENTS,
    SHARED_PIPES
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    FontAwesomeModule,
    NgAisModule,
    FIRE_BASE,
    SHARED_COMPONENTS,
    SHARED_PIPES
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    FontAwesomeModule,
    NgAisModule,
    FIRE_BASE,
  ],
  providers: [],
})
export class SharedModule {
}


