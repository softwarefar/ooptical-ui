import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RoleService} from '../services/role.service';
import {UserService} from '../services/user.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
  }

  canActivate() {
    return this.roleService.hasRole('user').pipe(
      tap((isUser: boolean) => {
        if (!isUser) {
          this.router.navigate(['login']).then();
        }
      })
    );
  }
}
