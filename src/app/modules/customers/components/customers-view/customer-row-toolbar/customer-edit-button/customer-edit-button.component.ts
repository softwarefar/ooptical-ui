import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-customer-edit-button',
  templateUrl: './customer-edit-button.component.html',
  styleUrls: ['./customer-edit-button.component.css']
})
export class CustomerEditButtonComponent {

  @Output()
  editRequest: EventEmitter<void> = new EventEmitter<void>();

}
