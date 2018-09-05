import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../objects/customer';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AngularFirestore} from 'angularfire2/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {CustomerEditDialogComponent} from '../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {CustomerEditData} from '../../dialogs/dialog-data';
import {CustomerEditResult} from '../../dialogs/dialog-result';
import {flatMap} from 'rxjs/operators';
import {throwError} from 'rxjs';

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

  constructor(
    private dialog: MatDialog,
    private afs: AngularFirestore
  ) {
  }

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [/*'id', */'lastName', 'firstName', 'actions'];
  expandedIdElement: number = NaN;

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    this.dataSource.data = [];
    this.afs.collection<Customer>('customers').valueChanges().subscribe((value: Customer[]) => {
      this.dataSource.data = value;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterPredicate;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value;
  }

  filterPredicate = (data: Customer, filter: string) => {
    return true;
  };

  expendElement(id: number) {
    if (this.expandedIdElement === id) {
      this.expandedIdElement = NaN;
    } else {
      this.expandedIdElement = id;
    }
  }

  editCustomer(element: Customer) {
    this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
      width: '500px',
      data: {customer: element}
    }).afterClosed().pipe(flatMap((result: CustomerEditResult) => {
      if (!!result) {
        return fromPromise(this.afs.collection<Customer>('customers').doc(element.id).set(result.customer));
      } else {
        throwError(null);
      }
    })).subscribe(() => {
      console.log('Customer updated');
    });
  }

  deleteCustomer(element: Customer) {
    fromPromise(this.afs.collection<Customer>('customers').doc(element.id).delete()).subscribe(() => {
      console.log('Customer deleted');
    });
  }
}
