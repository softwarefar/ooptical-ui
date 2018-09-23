import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../../services/store.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-store-selector',
  templateUrl: './store-selector.component.html',
  styleUrls: ['./store-selector.component.css']
})
export class StoreSelectorComponent implements OnInit {

  stores?: Store[];

  storeControl: FormControl = new FormControl();

  constructor(
    private storeService: StoreService
  ) {
  }

  ngOnInit() {
    this.storeService.getStores().subscribe((stores: Store[]) => {
      this.stores = stores;
      if (!!stores.length) {
        this.storeControl.setValue(stores[0]);
      }
    });
    this.storeControl.valueChanges.subscribe((store: Store) => {
      console.log(store);
    });
  }

}
