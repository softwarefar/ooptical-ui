import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-view-button',
  templateUrl: './customer-view-button.component.html',
  styleUrls: ['./customer-view-button.component.css']
})
export class CustomerViewButtonComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  @Input()
  customer: Customer;

  openCustomer() {
    this.router.navigate([`/customers/${this.customer.id}`]);
  }
}
