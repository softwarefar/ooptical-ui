import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../objects/customer';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CustomerEditDialogComponent} from '../../dialogs/customer-edit-dialog/customer-edit-dialog.component';
import {CustomerEditData} from '../../dialogs/dialog-data';
import {CustomerEditResult} from '../../dialogs/dialog-result';
import {AngularFirestore} from 'angularfire2/firestore';

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
    public dialog: MatDialog,
    private afs: AngularFirestore
  ) {
  }

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['lastName', 'firstName'];
  expandedIdElement: number = NaN;

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    console.log('CUSTOMERVIEWS');
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

  openCreateNewCustomerDialog() {
    const dialogRef: MatDialogRef<CustomerEditDialogComponent, CustomerEditResult> =
      this.dialog.open<CustomerEditDialogComponent, CustomerEditData, CustomerEditResult>(CustomerEditDialogComponent, {
        width: '500px',
        data: {customer: {id: null, firstName: '', lastName: ''}}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  expendElement(id: number) {
    if(this.expandedIdElement === id) {
      this.expandedIdElement = NaN;
    } else {
      this.expandedIdElement = id;
    }
  }
}
