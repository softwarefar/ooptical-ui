import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RoleService} from '../services/role.service';
import {UserService} from '../services/user.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can(route, state);
  }

  can(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.roleService.hasRole('admin').pipe(
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          this.router.navigate(['login']).then();
        }
      })
    );
  }
}
