import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RoleService} from '../services/role.service';
import {UserService} from '../services/user.service';
import {WorkplacesService} from '../services/workplaces.service';

@Injectable({
  providedIn: 'root'
})
export class StoreMemberGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private workplacesService: WorkplacesService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can(route, state);
  }

  can(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.workplacesService.getStores().pipe(
      map((stores: string[]) => {
        const valid = !!stores.length && stores.includes(route.params.storeId);
        if (!valid) {
          this.router.navigate(['']);
        }
        return valid;
      })
    );
  }
}
