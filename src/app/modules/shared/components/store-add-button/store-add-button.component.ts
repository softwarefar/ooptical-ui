import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StoreService} from '../../../core/services/store.service';

@Component({
  selector: 'app-store-add-button',
  templateUrl: './store-add-button.component.html',
  styleUrls: ['./store-add-button.component.css']
})
export class StoreAddButtonComponent {

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService  ) {
  }

  openCreateNewCustomerDialog() {
/*
    this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
      width: '800px',
      data: {customer: {birthDate: new Date().getTime()}}
    }).afterClosed().subscribe((result: CustomerEditResult | undefined) => {
      if (result && result.customer) {
        console.log(result.customer);
        this.customerService.createCustomer(result.customer).subscribe(() => {
          console.log('The customer was created');
        });
      }
    });
*/
  }
}
