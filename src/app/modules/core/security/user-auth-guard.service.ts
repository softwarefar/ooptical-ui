import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RoleService} from '../services/role.service';
import {UserService} from '../services/user.service';
import {User} from 'firebase';
import {fromPromise} from 'rxjs/internal-compatibility';

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
      flatMap((user: User) => {
        if (!!user) {
          return this.roleService.hasRoles(user, 'user');
        }
        return fromPromise(this.router.navigate(['/login'])).pipe(
          map((nav: boolean) => false)
        );
      })
    );
  }
}
