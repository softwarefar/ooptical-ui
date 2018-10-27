import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CustomerEditDialogComponent} from '../../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {CustomerService} from '../../../../core/services/customer.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-add-button',
  templateUrl: './customer-add-button.component.html',
  styleUrls: ['./customer-add-button.component.css']
})
export class CustomerAddButtonComponent {

  faPlus = faPlus;

  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService
  ) {
  }

  openCreateNewCustomerDialog() {
    this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
      width: '800px',
      data: {customer: {birthDate: new Date().getTime()}}
    }).afterClosed().subscribe((result: CustomerEditResult | undefined) => {
      if (result && result.customer) {
        this.customerService.createCustomer(result.customer).subscribe(() => {
          console.log('The customer was created');
        });
      }
    });
  }
}
