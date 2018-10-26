import {Component} from '@angular/core';
import {auth} from 'firebase';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {fromPromise} from 'rxjs/internal-compatibility';
import {flatMap, map} from 'rxjs/operators';
import {RoleService} from '../../services/role.service';
import {StoreService} from '../../services/store.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-anonymous-board',
  templateUrl: './anonymous-board.component.html',
  styleUrls: ['./anonymous-board.component.css']
})
export class AnonymousBoardComponent {

  constructor(
    private router: Router,
    private roleService: RoleService,
    private storeService: StoreService,
    private afAuth: AngularFireAuth
  ) {
  }

  credential: auth.UserCredential;

  login() {
    fromPromise(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())).pipe(
      flatMap((value: auth.UserCredential) => {
          this.credential = value;
          if (value.user) {
            return this.roleService.userHasRole(value.user.email, 'user');
          } else {
            return of(false);
          }
        }
      ),
      flatMap((isUser: boolean) => {
          return this.storeService.getFirstAllowedStores().pipe(
            map(() => {
              return isUser;
            })
          );
        }
      )
    ).subscribe((isUser: boolean) => {
      if (isUser) {
        return this.router.navigate([`/`]);
      }
    });
  }
}
