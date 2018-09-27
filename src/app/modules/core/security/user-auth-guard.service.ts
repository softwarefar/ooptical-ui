import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {flatMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {RoleService} from '../services/role.service';
import {UserService} from '../services/user.service';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can();
  }

  can(): Observable<boolean> {
    return this.userService.getUser().pipe(
      flatMap((user?: User | null) => {
        if (!!user) {
          return this.roleService.hasRole('user');
        }
        return of(false).pipe(
          tap(() => {
            this.router.navigate(['/login']);
          })
        );
      })
    );
  }
}
