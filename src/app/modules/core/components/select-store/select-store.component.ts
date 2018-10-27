import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {RoleService} from '../../services/role.service';
import {Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import {faStore} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  styleUrls: ['./select-store.component.css']
})
export class SelectStoreComponent implements OnInit {

  faStore = faStore;

  stores: Store[];
  admin = false;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.roleService.hasRole('admin').pipe(
      flatMap((admin: boolean) => {
        this.admin = admin;
        return this.storeService.getAllowedStores();
      })
    ).subscribe((stores: Store[]) => {
      this.stores = stores;
      if (stores.length === 1 && !this.admin) {
        this.router.navigate([`${stores[0].id}`]).then();
      }
    });
  }
}
