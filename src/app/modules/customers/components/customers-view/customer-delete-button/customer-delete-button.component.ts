import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-customer-delete-button',
  templateUrl: './customer-delete-button.component.html',
  styleUrls: ['./customer-delete-button.component.css']
})
export class CustomerDeleteButtonComponent {

  @Output()
  deleteRequest: EventEmitter<void> = new EventEmitter<void>();

}
