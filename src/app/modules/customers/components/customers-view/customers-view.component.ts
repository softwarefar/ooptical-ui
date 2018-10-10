import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CustomerEditDialogComponent} from '../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {flatMap, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {CustomerService} from '../../../core/services/customer.service';
import {toolbarAppear} from '../../../shared/animation';
import {MultiResponse} from 'algoliasearch';
import {FormControl} from '@angular/forms';
import {CollectionReference, Query} from '@angular/fire/firestore';
import {AlgoliaClientService} from '../../../core/services/algolia-client.service';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    toolbarAppear
  ],
})
export class CustomersViewComponent implements OnInit {
  searchForm: FormControl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService
  ) {
  }

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [/*'id', */'gender', 'lastName', 'firstName', 'birthDate', 'address', 'phoneNumber', 'email', 'lastAccessDate', 'actions'];
  expandedIdElement?: string;
  overflownIdElement?: string;

  @ViewChild(MatSort)
  sort?: MatSort;

  queryFn: (ref: CollectionReference) => Query = (ref: CollectionReference) => {
    return ref.orderBy('lastAccessDate', 'asc');
  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(
      flatMap((value: string) => {
        if (!!value) {
          return this.customerService.searchCustomers(value);
        } else {
          return this.customerService.getCustomers(this.queryFn);
        }
      })
    ).subscribe((res: Customer[]) => {
      this.dataSource.data = res;
    });
    this.dataSource.data = [];
    this.customerService.getCustomers(this.queryFn).subscribe((value: Customer[]) => {
      this.dataSource.data = value;
    });
    this.dataSource.sort = this.sort || null;
  }

  expendElement(id: string) {
    if (this.expandedIdElement === id) {
      this.expandedIdElement = undefined;
    } else {
      this.expandedIdElement = id;
    }
  }

  editCustomer(element: Customer) {
    this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
      width: '800px',
      data: {customer: element}
    }).afterClosed().pipe(
      flatMap((result?: CustomerEditResult) => {
          if (!!result) {
            return this.customerService.updateCustomer(result.customer);
          } else {
            return throwError(null);
          }
        }
      )
    ).subscribe(() => {
      console.log('Customer updated');
    });
  }

  deleteCustomer(element: Customer) {
    this.customerService.deleteCustomer(element).subscribe(() => {
      console.log('Customer deleted');
    });
  }

  mouseEnter($event: Customer) {
    this.overflownIdElement = $event.id;
  }

  mouseLeave() {
    this.overflownIdElement = undefined;
  }
}
