import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './modules/shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {UserAuthGuard} from './modules/core/security';
import {CoreModule} from './modules/core/core.module';
import {AnonymousBoardComponent, LoggedBoardComponent, SelectStoreComponent} from './modules/core/components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AdminBoardComponent} from './modules/core/components';
import {AdminAuthGuard, StoreMemberGuard} from './modules/core/security';
import {CustomersViewComponent} from './modules/customers/components';
import {CustomersModule} from './modules/customers/customers.module';

const routes: Routes = [
  {path: '', component: SelectStoreComponent, canActivate: [UserAuthGuard]},
  {path: 'login', component: AnonymousBoardComponent},
  {path: 'admin', component: AdminBoardComponent, canActivate: [AdminAuthGuard]},
  {
    path: ':storeId', component: LoggedBoardComponent, canActivate: [StoreMemberGuard], children: [
      {path: '', redirectTo: 'customers', pathMatch: 'full'},
      {path: 'customers', component: CustomersViewComponent},
      {path: 'customers/:customerId', loadChildren: './modules/customer/customer.module#CustomerModule'},
      {path: 'products', loadChildren: './modules/products/products.module#ProductsModule'}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomersModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
