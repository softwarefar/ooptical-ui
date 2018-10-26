import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-customer-view-button',
  templateUrl: './customer-view-button.component.html',
  styleUrls: ['./customer-view-button.component.css']
})
export class CustomerViewButtonComponent {
  constructor(
  ) {}

  @Input()
  customer?: Customer;
}
