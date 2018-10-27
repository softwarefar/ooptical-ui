import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../../services/store.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-selector',
  templateUrl: './store-selector.component.html',
  styleUrls: ['./store-selector.component.css']
})
export class StoreSelectorComponent implements OnInit {

  stores?: Store[];

  storeControl: FormControl = new FormControl();

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.storeService.getAllowedStores().subscribe((stores: Store[]) => {
      this.stores = stores;
      if (!!stores.length) {
        this.storeControl.setValue(stores[0]);
      }
    });
    this.storeControl.valueChanges.subscribe((store: Store) => {
      this.router.navigate([`/${store.id}`]);
    });
  }

}
