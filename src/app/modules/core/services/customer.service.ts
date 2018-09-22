import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, DocumentSnapshot, Query} from 'angularfire2/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private afs: AngularFirestore
  ) {
  }


  surveyCustomers(queryFn?: (ref: CollectionReference) => Query) {
    return this.afs.collection<Customer>('customers', queryFn).valueChanges();
  }

  getCustomers(): Observable<Customer[]> {
    return fromPromise(this.afs.collection<Customer>(`customers`).ref.get()).pipe(
      map((documentSnapshot: DocumentSnapshot<Roles>) => {
        if (!!documentSnapshot) {
          return documentSnapshot.data();
        } else {
          return [];
        }
      }));
  }

  surveyCustomer(id: string): Observable<Customer | undefined> {
    return this.afs.collection<Customer>(`customers`).doc<Customer>(`${id}`).valueChanges();
  }

  getCustomer(id: string): Observable<Customer> {
    return fromPromise(this.afs.collection<Customer>(`customers`).doc<Customer>(`${id}`).ref.get()).pipe(
      map((documentSnapshot: DocumentSnapshot<Customer>) => {
        if (!!documentSnapshot) {
          return documentSnapshot.data();
        } else {
          return null;
        }
      }),
      tap((customer: Customer) => {
        customer.lastAccessDate = new Date().getTime();
        fromPromise(this.afs.collection<Customer>('customers').doc(customer.id).set(customer));
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
