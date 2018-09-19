import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DynTabService} from '../../../core/services/dyn-tab-service';
import {AngularFirestore} from 'angularfire2/firestore';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  constructor(
    private dynTabService: DynTabService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
  }

  customer: Customer;

  ngOnInit() {
    this.route.params.pipe(
      flatMap((params: Params) => {
        return this.afs.collection<Customer>('customers').doc(`${params.id}`).valueChanges();
      })
    ).subscribe((customer: Customer) => {
      if (!this.customer || customer.id !== this.customer.id) {
        this.dynTabService.addNavLinkEvent.next(this.getNavLink(customer));
      }
      this.customer = customer;
    });
  }

  getNavLink(customer: Customer): NavLink {
    return {
      type: 'CUSTOMER',
      label: `${customer.lastName} - ${customer.firstName}`,
      path: `/customers/${customer.id}`,
      closeable: true,
      multiple: true,
    };
  }

}
