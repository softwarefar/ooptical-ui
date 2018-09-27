import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {first, tap} from 'rxjs/operators';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private afs: AngularFirestore
  ) {
  }


  surveyCustomers(queryFn?: (ref: CollectionReference) => Query): Observable<Customer[]> {
    return this.afs.collection<Customer>('customers', queryFn).valueChanges();
  }

  getCustomers(queryFn?: (ref: CollectionReference) => Query): Observable<Customer[]> {
    return this.surveyCustomers(queryFn).pipe(
      first()
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
