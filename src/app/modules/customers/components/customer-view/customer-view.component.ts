import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Customer} from '../objects/customer';
import {CustomerService} from '../../services';
import {DynTabService} from '../../../../dyn-tab-service';
import {NavLink} from '../../../../objects/nav-link';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private dynTabService: DynTabService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.load(+params.id);
    });
  }

  load(id: number) {
    this.customerService.find(id).subscribe((customer: Customer) => {
      this.dynTabService.addNavLinkEvent.next(this.getNavLink(customer));
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
