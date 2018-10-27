import {Component, EventEmitter, Output} from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-edit-button',
  templateUrl: './customer-edit-button.component.html',
  styleUrls: ['./customer-edit-button.component.css']
})
export class CustomerEditButtonComponent {

  faPencilAlt = faPencilAlt;

  @Output()
  editRequest: EventEmitter<void> = new EventEmitter<void>();

}
