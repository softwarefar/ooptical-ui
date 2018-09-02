import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CUSTOMERS_COMPONENTS, CustomersViewComponent, CustomerViewComponent} from './components';
import {CUSTOMERS_SERVICES} from './services';
import {CUSTOMERS_COMPONENTS_DIALOGS, CUSTOMERS_DIALOGS} from './dialogs';

const customersRoutes: Routes = [
  {path: '', component: CustomersViewComponent},
  {path: ':id', component: CustomerViewComponent}
];

@NgModule({
  declarations: [CUSTOMERS_COMPONENTS, CUSTOMERS_DIALOGS, CUSTOMERS_COMPONENTS_DIALOGS],
  exports: [RouterModule],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(customersRoutes)
  ],
  providers: [CUSTOMERS_SERVICES],
  entryComponents: [CUSTOMERS_DIALOGS]
})
export class CustomersModule {
}


