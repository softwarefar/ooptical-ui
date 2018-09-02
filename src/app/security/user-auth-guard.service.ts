import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Roles} from '../modules/shared/objects/roles';
import {AngularFirestore} from 'angularfire2/firestore';
import {flatMap, map, tap} from 'rxjs/operators';
import {User} from 'firebase';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can();
  }

  can() {
    return this.afAuth.user.pipe(
      flatMap((user: User) => {
        if (!!user) {
          return this.afs.collection<Roles>(`roles`).doc<Roles>(`${user.email}`).valueChanges();
        }
        this.router.navigate(['/login']);
        return of({} as Roles);
      }),
      map((roles: Roles) => {
        return roles.user;
      })
    );
  }
}
