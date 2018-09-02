import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerEditData} from '../dialog-data';
import {CustomerEditResult} from '../dialog-result';
import {Customer} from '../../components/objects/customer';

@Component({
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.css']
})
export class CustomerEditDialogComponent implements OnInit {

  customer: Customer;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditDialogComponent, CustomerEditResult>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerEditData) {
    this.customer = Object.assign({}, data.customer);
  }

  ngOnInit() {
  }

}
