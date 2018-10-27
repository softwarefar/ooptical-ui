import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';
import {Moment} from 'moment';
import {FormControl} from '@angular/forms';
import {PlaceService} from '../../../core/services/place.service';
import {flatMap} from 'rxjs/operators';
import {faFemale, faMale} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.css']
})
export class CustomerEditDialogComponent implements OnInit {
  faFemale = faFemale;
  faMale = faMale;

  importEnabled: boolean = true;
  customerJson: string = '';
  /*`${JSON.stringify({
  firstName: '',
  lastName: '',
  birthDate: new Date().getTime(),
  address: '',
  phoneNumber: '',
  email: '',
  about: '',
  gender: 'MALE'
  })}`;
*/
  customer: Partial<Customer>;
  birthDateForm: FormControl = new FormControl();
  addressForm: FormControl = new FormControl();

  addresses?: any[];

  constructor(
    private ref: ChangeDetectorRef,
    private placeService: PlaceService,
    public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerEditData) {
    this.customer = Object.assign({gender: 'MALE'}, data.customer);

    if (!!this.customer.address) {
      this.addressForm.setValue(this.customer.address);
    }
    if (!!this.customer.birthDate) {
      this.birthDateForm.setValue(moment(this.customer.birthDate));
    }
  }

  ngOnInit() {
    this.addressForm.valueChanges.pipe(
      flatMap((text: string) => {
          this.customer.address = text;
          return this.placeService.findAddress(text);
        }
      ),
    ).subscribe((addresses: any) => {
      this.addresses = addresses;
      this.ref.detectChanges();
    });
    this.birthDateForm.valueChanges.subscribe((date: Moment) => {
      this.customer.birthDate = +date.format('x');
    });
  }

  import() {
    this.dialogRef.close({customer: JSON.parse(this.customerJson)});
  }

  saveAsFeMale() {
    this.dialogRef.close({customer: {gender: 'FEMALE', ...this.customer}});
  }

  saveAsMale() {
    this.dialogRef.close({customer: {gender: 'MALE', ...this.customer}});
  }
}

