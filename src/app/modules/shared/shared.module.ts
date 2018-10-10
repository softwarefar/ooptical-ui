import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './mat.module';

import {SHARED_COMPONENTS} from './components';
import {SHARED_PIPES} from './pipes';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {RouterModule} from '@angular/router';
import { NgAisModule } from 'angular-instantsearch';

const FIRE_BASE  = [
  AngularFireModule,
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule,
];


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
    NgAisModule,
    FIRE_BASE,
  ],
  providers: [],
})
export class SharedModule {
}


