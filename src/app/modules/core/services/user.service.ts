import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
  }


  getUser(): Observable<User> {
    if (!this.user) {
      return this.afAuth.user.pipe(
        tap((user: User) => {
          this.user = user;
        })
      );
    } else {
      return of(this.user);
    }
  }
}
