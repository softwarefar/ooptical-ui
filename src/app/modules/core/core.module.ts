import {NgModule} from '@angular/core';
import {CORE_COMPONENTS} from './components';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  exports: [
    CORE_COMPONENTS
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
  providers: [],
})
export class CoreModule {
}


