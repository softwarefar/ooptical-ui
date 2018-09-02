import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Customer} from '../components/objects/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    protected http: HttpClient
  ) { }

  find(id: number): Observable<Customer> {
    return of({id: id, firstName: 'Francois', lastName: 'Achache'});
  }
}
