import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
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


  getUser(): Observable<User | null | undefined> {
    if (!this.user) {
      return this.afAuth.user.pipe(
        tap((user?: User | null) => {
          if (!!user) {
            this.user = user;
          }
        })
      );
    } else {
      return of(this.user);
    }
  }
}
