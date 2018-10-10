import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AlgoliaClientService} from './algolia-client.service';
import {Client, MultiResponse} from 'algoliasearch';
import * as algoliasearch from 'algoliasearch';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  client: Client;

  constructor(
    private algoliaClientService: AlgoliaClientService,
    private afs: AngularFirestore
  ) {
    this.client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
  }


  surveyCustomers(queryFn?: (ref: CollectionReference) => Query): Observable<Customer[]> {
    return this.afs.collection<Customer>('customers', queryFn).valueChanges();
  }

  getCustomers(queryFn?: (ref: CollectionReference) => Query): Observable<Customer[]> {
    return this.surveyCustomers(queryFn).pipe(
      first()
    );
  }

  searchCustomers(query: string) {
    return fromPromise(this.client.search([{
      indexName: 'customer_search', query: query, params: {
        attributesToSnippet: [],
        attributesToHighlight: []
      }
    }])).pipe(
      map((res: MultiResponse) => {
        return res.results[0].hits;
      })
    );
  }

  surveyCustomer(id: string): Observable<Customer | undefined> {
    return this.afs.collection<Customer>(`customers`).doc<Customer>(`${id}`).valueChanges();
  }

  getCustomer(id: string): Observable<Customer | undefined> {
    return this.surveyCustomer(id).pipe(
      first(),
      tap((customer?: Customer) => {
        if (!!customer) {
          customer.lastAccessDate = new Date().getTime();
          fromPromise(this.afs.collection<Customer>('customers').doc(customer.id).set(customer));
        }
      })
    );
  }

  updateCustomer(customer: Customer): Observable<void> {
    customer.updateDate = new Date().getTime();
    return fromPromise(this.afs.collection<Customer>('customers').doc(customer.id).set(customer));
  }

  createCustomer(customer: Partial<Customer>): Observable<void> {
    const id: string = this.afs.createId();
    const c: Partial<Customer> = {
      id: id,
      ...customer,
      creationDate: new Date().getTime()
    };
    return fromPromise(this.afs.collection<Customer>('customers').doc(id).set(c));
  }

  deleteCustomer(customer: Customer) {
    return fromPromise(this.afs.collection<Customer>('customers').doc(customer.id).delete());
  }
}
