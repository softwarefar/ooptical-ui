import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {first, flatMap, map} from 'rxjs/operators';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {WorkplacesService} from './workplaces.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private afs: AngularFirestore,
    private workplacesService: WorkplacesService
  ) {
  }


  surveyStores(queryFn?: (ref: CollectionReference) => Query): Observable<Store[]> {
    return this.afs.collection<Store>('stores', queryFn).valueChanges();
  }

  getFirstAllowedStores(): Observable<Store> {
    return this.getAllowedStores().pipe(
      map((stores: Store[]) => {
        return stores.shift();
      })
    );
  }
  getAllowedStores(): Observable<Store[]> {
    return this.workplacesService.getStores().pipe(
      flatMap((storeKeys: string[]) => {
        return this.getStores().pipe(
          map((stores: Store[]) => {
            return stores.filter((s: Store) => {
              return storeKeys.includes(s.id);
            });
          })
        );
      }),
    );
  }

  getStores(queryFn?: (ref: CollectionReference) => Query): Observable<Store[]> {
    return this.surveyStores(queryFn).pipe(
      first()
    );
  }

  surveyStore(id: string): Observable<Store | undefined> {
    return this.afs.collection<Store>(`stores`).doc<Store>(`${id}`).valueChanges();
  }

  getStore(id: string): Observable<Store | undefined> {
    return this.surveyStore(id).pipe(
      first()
    );
  }

  updateStore(Store: Store): Observable<void> {
    return fromPromise(this.afs.collection<Store>('Stores').doc(Store.id).set(Store));
  }

  createStore(Store: Partial<Store>): Observable<void> {
    const id: string = this.afs.createId();
    const s: Partial<Store> = {
      id: id,
      ...Store
    };
    return fromPromise(this.afs.collection<Store>('Stores').doc(id).set(s));
  }

  deleteStore(Store: Store) {
    return fromPromise(this.afs.collection<Store>('Stores').doc(Store.id).delete());
  }
}
