import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import {Moment} from 'moment';
import {FormControl} from '@angular/forms';
import {PlaceService} from '../../../core/services/place.service';
import {flatMap} from 'rxjs/operators';

@Component({
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.css']
})
export class CustomerEditDialogComponent implements OnInit {
  customer: Partial<Customer>;
  birthDateForm: FormControl = new FormControl();
  addressForm: FormControl = new FormControl();

  addresses?: any[];

  constructor(
    private ref: ChangeDetectorRef,
    private placeService: PlaceService,
    @Inject(MAT_DIALOG_DATA) public data: CustomerEditData) {
    this.customer = Object.assign({}, data.customer);

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
}
