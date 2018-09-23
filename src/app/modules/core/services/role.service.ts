import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {Observable, of} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles?: Partial<Roles>;

  constructor(
    private afs: AngularFirestore
  ) {
  }

  getRoles(login: string): Observable<Partial<Roles>> {
    if (!this.roles) {
      return this.afs.collection<Roles>(`roles`).doc<Roles>(`${login}`).valueChanges().pipe(
        first(),
        map((roles?: Roles) => {
          return roles || {};
        }),
        tap((roles: Partial<Roles>) => {
          this.roles = roles;
        }),
      );
    } else {
      return of(this.roles);
    }
  }

  hasRoles(user: User, role: keyof Roles): Observable<boolean> {
    if (!!user && !!user.email) {
      return this.getRoles(user.email).pipe(
        map((roles: Partial<Roles>) => {
          if (!!roles) {
            return !!roles[role];
          }
          return false;
        })
      );
    }
    return of(false);
  }
}
