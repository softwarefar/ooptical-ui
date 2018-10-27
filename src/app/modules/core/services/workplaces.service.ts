import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {first, flatMap, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WorkplacesService {

  constructor(
    private userService: UserService,
    private afs: AngularFirestore
  ) {
  }

  getWorkplaces(login?: string): Observable<Workplaces> {
    if (!!login) {
      return this.afs.collection<Workplaces>(`workplaces`).doc<Workplaces>(`${login}`).valueChanges().pipe(
        first(),
        map((workplaces?: Workplaces) => {
          return workplaces || {stores: []};
        })
      );
    } else {
      return of({stores: []});
    }
  }

  getStores(): Observable<string[]> {
    return this.userService.getLogin().pipe(
      flatMap((login: string) => {
        return this.getWorkplaces(login);
      }),
      map((workplaces: Workplaces) => {
        return workplaces.stores;
      })
    );
  }
}
