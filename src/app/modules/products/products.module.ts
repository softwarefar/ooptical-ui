import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {PRODUCTS_COMPONENTS, ProductsViewComponent, ProductViewComponent} from './components';
import {PRODUCTS_COMPONENTS_DIALOGS, PRODUCTS_DIALOGS} from './dialogs';
import {PRODUCTS_SERVICES} from './services';

const productsRoutes: Routes = [
  {path: '', component: ProductsViewComponent},
  {path: ':id', component: ProductViewComponent}
];

@NgModule({
  declarations: [PRODUCTS_COMPONENTS, PRODUCTS_DIALOGS, PRODUCTS_COMPONENTS_DIALOGS],
  exports: [RouterModule],
  imports: [
    SharedModule,
    RouterModule.forChild(productsRoutes)
  ],
  providers: [PRODUCTS_SERVICES],
  entryComponents: [PRODUCTS_DIALOGS]
})
export class ProductsModule {
}


