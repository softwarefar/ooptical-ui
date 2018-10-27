import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CUSTOMER_COMPONENTS, CustomerViewComponent} from './components';
import {CUSTOMER_COMPONENTS_DIALOGS, CUSTOMER_DIALOGS} from './dialogs';

const customerRoutes: Routes = [
  {path: '', component: CustomerViewComponent}
];

@NgModule({
  declarations: [CUSTOMER_COMPONENTS, CUSTOMER_DIALOGS, CUSTOMER_COMPONENTS_DIALOGS],
  exports: [RouterModule],
  imports: [
    SharedModule,
    RouterModule.forChild(customerRoutes)
  ],
  entryComponents: [CUSTOMER_DIALOGS]
})
export class CustomerModule {
}


