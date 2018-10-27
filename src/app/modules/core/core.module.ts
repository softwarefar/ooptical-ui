import {InjectionToken, NgModule} from '@angular/core';
import {CORE_COMPONENTS} from './components';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import * as algoliasearch from 'algoliasearch';
import {environment} from '../../../environments/environment';
import {Client} from 'algoliasearch';
import {CORE_COMPONENTS_DIALOGS, CORE_DIALOGS} from './dialogs';

export const ALGOLIA_CLIENT = new InjectionToken<Client>('algilia.client');
const algoliaSearchClientFactory = (): Client => {
  return algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
};
@NgModule({
  declarations: [
    CORE_COMPONENTS, CORE_DIALOGS, CORE_COMPONENTS_DIALOGS
  ],
  exports: [
    CORE_COMPONENTS, CORE_COMPONENTS_DIALOGS
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
  providers: [
    {provide: ALGOLIA_CLIENT,  useFactory: algoliaSearchClientFactory}
  ],
  entryComponents: [
    CORE_DIALOGS
  ]
})
export class CoreModule {
}

