import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PlaceService} from '../../services/place.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {flatMap} from 'rxjs/operators';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {EMPTY, of} from 'rxjs';

@Component({
  selector: 'app-store-edit-dialog',
  templateUrl: './store-edit-dialog.component.html',
  styleUrls: ['./store-edit-dialog.component.css']
})
export class StoreEditDialogComponent implements OnInit {
  faSave = faSave;
  store: Partial<Store>;
  addressForm: FormControl = new FormControl();

  addresses?: any[];

  constructor(
    private ref: ChangeDetectorRef,
    private placeService: PlaceService,
    public dialogRef: MatDialogRef<StoreEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StoreEditData) {
    this.store = Object.assign({}, data.store);

    if (!!this.store.address) {
      this.addressForm.setValue(this.store.address);
    }
  }

  ngOnInit() {
    this.addressForm.valueChanges.pipe(
      flatMap((text: string) => {
          this.store.address = text;
          if (!!text && !!text.length) {
            return this.placeService.findAddress(text);
          } else {
            return of([]);
          }
        }
      ),
    ).subscribe((addresses: any) => {
      this.addresses = addresses;
      this.ref.detectChanges();
    });
  }

  save() {
    this.dialogRef.close({store: this.store});
  }
}
