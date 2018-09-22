import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-customer-row-toolbar',
  templateUrl: './customer-row-toolbar.component.html',
  styleUrls: ['./customer-row-toolbar.component.css']
})
export class CustomerRowToolbarComponent implements OnInit {

  @Output()
  deleteRequest: EventEmitter<Customer> = new EventEmitter<Customer>();

  @Output()
  editRequest: EventEmitter<Customer> = new EventEmitter<Customer>();

  @Input()
  customer?: Customer;

  constructor() { }

  ngOnInit() {
  }


}
