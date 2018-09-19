import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './modules/shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {UserAuthGuard} from './modules/core/security/user-auth-guard.service';
import {CoreModule} from './modules/core/core.module';
import {AnonymousBoardComponent, LoggedBoardComponent} from './modules/core/components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '', component: LoggedBoardComponent,
    canActivate: [UserAuthGuard],
    canActivateChild: [UserAuthGuard],
    children: [
      {path: '', redirectTo: '/customers', pathMatch: 'full'},
      {path: 'customers', loadChildren: './modules/customers/customers.module#CustomersModule'},
      {path: 'products', loadChildren: './modules/products/products.module#ProductsModule'},
    ]
  },
  {path: 'login', component: AnonymousBoardComponent},
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
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
