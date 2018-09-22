import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DynTabService} from '../../../core/services/dyn-tab-service';
import {AngularFirestore} from 'angularfire2/firestore';
import {flatMap} from 'rxjs/operators';
import {NavLink} from '../../../core/models/nav-link/nav-link';
import {NavLinkType} from '../../../core/models/nav-link/nav-link-type';
import {AbstractNavigableComponent} from '../../../shared/components/abstract-navigable.component';
import {CustomerService} from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent extends AbstractNavigableComponent<Customer> implements OnInit {

  constructor(
    private dynTabService: DynTabService,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    super();
  }

  customer?: Partial<Customer>;

  ngOnInit() {
    this.route.params.pipe(
      flatMap((params: Params) => {
        return this.customerService.getCustomer(params.id);
      })
    ).subscribe((customer: Partial<Customer> | undefined) => {
      if (!!customer) {
        if (!this.customer || (customer.id !== this.customer.id)) {
          this.dynTabService.addNavLinkEvent.next(this.getNavLink(customer));
        }
      }
      this.customer = customer;
    });
  }

  getNavLink(customer: Partial<Customer>): NavLink {
    return {
      type: NavLinkType.CUSTOMER,
      label: `${customer.lastName} - ${customer.firstName}`,
      path: `/customers/${customer.id}`
    };
  }

}
