import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from './modules/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {DynTabService} from './dyn-tab-service';
import {UserAuthGuard} from './security/user-auth-guard.service';
import {AnonymousBoardComponent, APP_VIEWS, LoggedBoardComponent} from './views';
import {CustomersModule} from './modules/customers/customers.module';

const routes: Routes = [
  {
    path: '', component: LoggedBoardComponent,
    canActivate: [UserAuthGuard],
    canActivateChild: [UserAuthGuard],
    children: [
      {path: '', redirectTo: '/customers', pathMatch: 'full'},
      {path: 'customers', loadChildren: './modules/customers/customers.module#CustomersModule'}
    ]
  },
  {path: 'login', component: AnonymousBoardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    APP_VIEWS
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  providers: [DynTabService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
