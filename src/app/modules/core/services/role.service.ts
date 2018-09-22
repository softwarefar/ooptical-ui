import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {AngularFirestore, DocumentSnapshot} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles?: Roles;

  constructor(
    private afs: AngularFirestore
  ) {
  }

  getRoles(login: string): Observable<Roles> {
    if (!this.roles) {
      return fromPromise(this.afs.collection<Roles>(`roles`).doc<Roles>(`${login}`).ref.get()).pipe(
        map((documentSnapshot: DocumentSnapshot<Roles>) => {
          if (!!documentSnapshot) {
            this.roles = documentSnapshot.data();
            return this.roles;
          }
        })
      );
    } else {
      return of(this.roles);
    }
  }

  hasRoles(user: User, role: keyof Roles): Observable<boolean> {
    if (!!user && !!user.email) {
      return this.getRoles(user.email).pipe(
        map((roles: Roles) => {
          if (!!roles) {
            return roles[role];
          }
          return false;
        })
      );
    }
    return of(false);
  }
}
