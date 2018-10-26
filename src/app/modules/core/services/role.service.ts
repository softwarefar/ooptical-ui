import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {first, flatMap, map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: Partial<Roles> | null = null;

  constructor(
    private userService: UserService,
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

  hasRole(role: keyof Roles): Observable<boolean> {
    return this.userService.getLogin().pipe(
      flatMap((login: string | null) => {
        return this.userHasRole(login, role);
      })
    );
  }

  userHasRole(login: string | null, role: keyof Roles): Observable<boolean> {
    if (!!login) {
      return this.getRoles(login).pipe(
        map((roles: Partial<Roles>) => {
          return !!roles ? !!roles[role] : false;
        })
      );
    }
    return of(false);
  }
}
