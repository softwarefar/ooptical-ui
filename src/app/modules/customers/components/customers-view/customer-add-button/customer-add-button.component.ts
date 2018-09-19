import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CustomerEditDialogComponent} from '../../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-customer-add-button',
  templateUrl: './customer-add-button.component.html',
  styleUrls: ['./customer-add-button.component.css']
})
export class CustomerAddButtonComponent {

  constructor(
    private dialog: MatDialog,
    private afs: AngularFirestore
  ) {
  }

  openCreateNewCustomerDialog() {
    this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
      width: '800px',
      data: {customer: {id: null, firstName: '', lastName: '', birthDate: new Date().getTime(), address: '', phoneNumber: '', email: '', details: ''}}
    }).afterClosed().subscribe((result: CustomerEditResult) => {
      if (result && result.customer) {
        const id: string = this.afs.createId();
        fromPromise(this.afs.collection('customers').doc(id).set({
          id: id,
          firstName: result.customer.firstName,
          lastName: result.customer.lastName
        })).subscribe(() => {
          console.log('The customer was created');
        });
      }
    });
  }
}
