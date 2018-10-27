import {Component, EventEmitter, Output} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-delete-button',
  templateUrl: './customer-delete-button.component.html',
  styleUrls: ['./customer-delete-button.component.css']
})
export class CustomerDeleteButtonComponent {

  faTimes = faTimes;

  @Output()
  deleteRequest: EventEmitter<void> = new EventEmitter<void>();

}
