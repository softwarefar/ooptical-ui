import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CollectionReference, Query} from '@angular/fire/firestore';
import {CustomerEditDialogComponent} from '../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {flatMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import * as _moment from 'moment';
import {CustomerService} from '../../../core/services/customer.service';
import {toolbarAppear} from '../../../shared/animation';

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

  moment = _moment;

  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService
  ) {
  }

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [/*'id', */'lastName', 'firstName', 'birthDate', 'address', 'phoneNumber', 'email', 'lastAccessDate', 'actions'];
  expandedIdElement?: string;
  overflownIdElement?: string;

  @ViewChild(MatSort)
  sort?: MatSort;

  queryFn: (ref: CollectionReference) => Query = (ref: CollectionReference) => {
    return ref.orderBy('lastName', 'asc');
  };

  ngOnInit() {
    this.dataSource.data = [];
    this.customerService.surveyCustomers(this.queryFn).subscribe((value: Customer[]) => {
      this.dataSource.data = value;
    });
    this.dataSource.sort = this.sort || null;
  }



  applyFilter(value: string) {
    this.dataSource.filter = value;
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
