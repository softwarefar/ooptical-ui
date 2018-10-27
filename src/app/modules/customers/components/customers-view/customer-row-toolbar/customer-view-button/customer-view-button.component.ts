import {Component, Input} from '@angular/core';
import {faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-view-button',
  templateUrl: './customer-view-button.component.html',
  styleUrls: ['./customer-view-button.component.css']
})
export class CustomerViewButtonComponent {

  faEye = faEye;

  @Input()
  customer?: Customer;
}
