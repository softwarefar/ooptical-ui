import {Injectable} from '@angular/core';
import * as algoliasearch from 'algoliasearch';
import {Client, MultiResponse} from 'algoliasearch';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {fromPromise} from 'rxjs/internal-compatibility';


@Injectable({
  providedIn: 'root'
})
export class AlgoliaClientService {

  client: Client;

  constructor() {
    this.client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
  }

  search(indexName: string, query: string): Observable<MultiResponse> {
    return fromPromise(this.client.search([{
      indexName: indexName, query: query, params: {
        attributesToSnippet: [],
        attributesToHighlight: [],
        attributesToRetrieve: ['id']
      }
    }]));
  }
}
