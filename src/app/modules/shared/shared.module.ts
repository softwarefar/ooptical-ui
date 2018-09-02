import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ConfigModule} from '@hhangular/common/dist/config';

import {MaterialModule} from './mat.module';

import {SHARED_COMPONENTS} from './components';
import {SHARED_SERVICES} from './services';
import {SHARED_PIPES} from './pipes';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    SHARED_COMPONENTS,
    SHARED_PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SHARED_COMPONENTS,
    SHARED_PIPES,
    FlexLayoutModule,
    ConfigModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ConfigModule
  ],
  providers: [
    SHARED_SERVICES
  ],
})
export class SharedModule {
}


