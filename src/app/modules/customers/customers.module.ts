import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CUSTOMERS_COMPONENTS, CustomersViewComponent} from './components';
import {CUSTOMERS_COMPONENTS_DIALOGS, CUSTOMERS_DIALOGS} from './dialogs';

@NgModule({
  declarations: [CUSTOMERS_COMPONENTS, CUSTOMERS_DIALOGS, CUSTOMERS_COMPONENTS_DIALOGS],
  exports: [CustomersViewComponent],
  imports: [
    SharedModule
  ],
  entryComponents: [CUSTOMERS_DIALOGS]
})
export class CustomersModule {
}


