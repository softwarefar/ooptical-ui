import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {StoreService} from '../../../core/services/store.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-stores-selector',
  templateUrl: './stores-selector.component.html',
  styleUrls: ['./stores-selector.component.css']
})
export class StoresSelectorComponent implements OnInit {

  faTimes = faTimes;

  @Input()
  selectedStores: string[] = [];

  @ViewChild('storeInput')
  storeInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  stores: Store[] = [];

  filteredStores: Observable<Store[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  storeCtrl = new FormControl();

  constructor (
    private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.getAllowedStores().subscribe((stores: Store[]) => {
      this.stores = stores;
    });
    this.filteredStores = this.storeCtrl.valueChanges.pipe(
      startWith(null),
      map((store: string | null) => {
        return store ? this._filter(store) : this.stores.slice();
      })
    );
  }

  addStore(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.selectedStores.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.storeCtrl.setValue(null);
    }
  }

  removeStore(store: string): void {
    const index = this.selectedStores.indexOf(store);

    if (index >= 0) {
      this.selectedStores.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedStores.push(event.option.value);
    this.storeInput.nativeElement.value = '';
    this.storeCtrl.setValue(null);
  }

  private _filter(value: string): Store[] {
    const filterValue = value.toLowerCase();
    return this.stores.filter(store => store.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
