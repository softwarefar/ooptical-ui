import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StoreService} from '../../../core/services/store.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {StoreEditDialogComponent} from '../../../core/dialogs';

@Component({
  selector: 'app-store-add-button',
  templateUrl: './store-add-button.component.html',
  styleUrls: ['./store-add-button.component.css']
})
export class StoreAddButtonComponent {

  faPlus = faPlus;

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService  ) {
  }

  openCreateNewStoreDialog() {
    this.dialog.open<StoreEditDialogComponent, StoreEditData, StoreEditResult>(StoreEditDialogComponent, {
      width: '800px',
      data: {store: {}}
    }).afterClosed().subscribe((result: StoreEditResult | undefined) => {
      if (result && result.store) {
/*
        this.storeService.createStore(result.store).subscribe(() => {
          console.log('The store was created');
        });
*/
      }
    });
  }
}
