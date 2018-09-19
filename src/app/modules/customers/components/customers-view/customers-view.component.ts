import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {CustomerEditDialogComponent} from '../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {flatMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import * as _moment from 'moment';

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
  ],
})
export class CustomersViewComponent implements OnInit {

  moment = _moment;

  constructor(
    private dialog: MatDialog,
    private afs: AngularFirestore
  ) {
  }

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [/*'id', */'lastName', 'firstName', 'birthDate', 'address', 'phoneNumber', 'email', 'actions'];
  expandedIdElement: number = NaN;

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    this.dataSource.data = [];
    this.afs.collection<Customer>('customers', this.queryFn).valueChanges().subscribe((value: Customer[]) => {
      this.dataSource.data = value;
    });
    this.dataSource.sort = this.sort;
  }

  queryFn: (ref: CollectionReference) => Query = (ref: CollectionReference) => {
    return ref.orderBy('lastName', 'asc');
  }

  applyFilter(value: string) {
    this.dataSource.filter = value;
  }

  expendElement(id: number) {
    if (this.expandedIdElement === id) {
      this.expandedIdElement = NaN;
    } else {
      this.expandedIdElement = id;
    }
  }

  editCustomer(element: Customer) {
    this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
      width: '800px',
      data: {customer: element}
    }).afterClosed().pipe(
      flatMap((result: CustomerEditResult) => {
        console.log(result);
        if (!!result) {
            return fromPromise(this.afs.collection<Customer>('customers').doc(element.id).set(result.customer));
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
    fromPromise(this.afs.collection<Customer>('customers').doc(element.id).delete()).subscribe(() => {
      console.log('Customer deleted');
    });
  }
}
